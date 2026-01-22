import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

export default function RegistrationUrlDisplay({ registrationUrl }) {
    const [copied, setCopied] = useState(false);
    
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(registrationUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy URL:', err);
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = registrationUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
    
    return (
        <div className="bg-white rounded-xl shadow-card border border-slate-100 p-6">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-brand-blue/10">
                    <ExternalLink className="w-5 h-5 text-brand-blue" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Club Registration Link</h3>
            </div>
            
            <p className="text-slate-600 mb-4">
                Share this link with potential athletes to let them register directly for your club:
            </p>
            
            <div className="flex gap-2 mb-4">
                <input 
                    type="text" 
                    value={registrationUrl} 
                    readOnly 
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                />
                <button 
                    onClick={copyToClipboard}
                    className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
                        copied 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-brand-blue text-white hover:bg-blue-700 border border-brand-blue'
                    }`}
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            Copy
                        </>
                    )}
                </button>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-sm text-slate-500">
                    Test the registration process:
                </span>
                <a 
                    href={registrationUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm hover:underline"
                >
                    Open Registration Page
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
}