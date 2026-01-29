import React, { useRef, useEffect, useState } from 'react';
import { Eraser, Check } from 'lucide-react';

const SignaturePad = ({ onSave, clearSignature, error }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const resizeCanvas = () => {
            const container = containerRef.current;
            if (container) {
                canvas.width = container.offsetWidth;
                canvas.height = 200;
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    const startDrawing = (e) => {
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        
        // Save signature as data URL
        if (hasSignature) {
            onSave(canvas.toDataURL());
        }
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        setHasSignature(true);
    };

    const clear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasSignature(false);
        clearSignature();
    };

    return (
        <div className="space-y-4">
            <div 
                ref={containerRef}
                className={`relative w-full bg-white border-2 rounded-2xl overflow-hidden transition-all ${
                    error ? 'border-red-200' : 'border-slate-100 hover:border-slate-200'
                }`}
                style={{ height: '200px' }}
            >
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="cursor-crosshair w-full h-full touch-none"
                />
                
                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        type="button"
                        onClick={clear}
                        className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all shadow-sm"
                        title="Clear Signature"
                    >
                        <Eraser className="w-4 h-4" />
                    </button>
                </div>

                {!hasSignature && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <p className="text-slate-300 text-sm font-medium uppercase tracking-widest">Sign here</p>
                    </div>
                )}
            </div>
            
            {hasSignature && (
                <div className="flex items-center gap-2 text-emerald-600">
                    <Check className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Signature Captured</span>
                </div>
            )}
        </div>
    );
};

export default SignaturePad;
