import React from 'react';
import TextInput from './TextInput';

export default function TimeInput({ value, onChange, className, ...props }) {
    const handleChange = (e) => {
        let val = e.target.value;
        
        // Remove everything except numbers and colons
        val = val.replace(/[^0-9:]/g, '');

        // Auto-insert colon for 4 digits like "1200" -> "12:00"
        if (val.length === 4 && !val.includes(':')) {
            val = val.slice(0, 2) + ':' + val.slice(2);
        }

        // Limit length to 5 characters (HH:mm)
        if (val.length > 5) return;

        // Create a synthetic event or simply call onChange with the value
        onChange({
            target: {
                name: props.name,
                value: val
            }
        });
    };

    const handleBlur = (e) => {
        let val = e.target.value;
        if (!val) return;

        // Simple validation/formatting on blur
        const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
        
        if (!timeRegex.test(val)) {
            // Try to fix "9:00" -> "09:00"
            const simpleTime = /^([0-9]):([0-5][0-9])$/;
            if (simpleTime.test(val)) {
                val = '0' + val;
            } else if (/^\d{1,2}$/.test(val)) {
                // Fix "9" -> "09:00"
                val = val.padStart(2, '0') + ':00';
            }
        }

        onChange({
            target: {
                name: props.name,
                value: val
            }
        });
    };

    return (
        <TextInput
            {...props}
            type="text"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="HH:mm (24h)"
            className={className}
        />
    );
}
