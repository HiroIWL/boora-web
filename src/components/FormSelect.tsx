'use client';

import React, { useId, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Typography } from './Typography';
import { Container } from './Container';

interface Option {
    label: string;
    value: string;
}

interface FormSelectProps {
    label: string;
    options: Option[];
    error?: string;
    multi?: boolean;
    placeholder?: string;
    name?: string;
    required?: boolean;
    onChange?: (value: string | string[]) => void;
}

export function FormSelect({
    label,
    options,
    error,
    multi = false,
    placeholder = 'Selecione...',
    name,
    onChange,
}: FormSelectProps) {
    const generatedId = useId();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    function toggleOpen() {
        setOpen((p) => !p);
    }

    function handleSelect(value: string) {
        if (multi) {
            setSelected((prev) =>
                prev.includes(value)
                    ? prev.filter((v) => v !== value)
                    : [...prev, value]
            );
        } else {
            setSelected([value]);
            setOpen(false);
        }
    }

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!dropdownRef.current?.contains(e.target as Node))
                setOpen(false);
        };
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, []);

    useEffect(() => {
        if (onChange) {
            onChange(multi ? selected : selected[0] || '');
        }
    }, [selected]);

    const displayLabel =
        selected.length === 0
            ? placeholder
            : multi
            ? `${selected.length} selecionado(s)`
            : options.find((o) => o.value === selected[0])?.label ||
              placeholder;

    return (
        <Container
            direction="column"
            gap={2}
            fluid={true}
            className="relative w-full"
        >
            <Typography
                variant="label"
                color="black"
                weight="semibold"
                htmlFor={generatedId}
            >
                {label}
            </Typography>

            <div ref={dropdownRef} className="relative w-full">
                <button
                    type="button"
                    onClick={toggleOpen}
                    className={cn(
                        'w-full border rounded-md px-4 py-3 text-left text-gray-900 bg-white',
                        'focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition',
                        error
                            ? 'border-red-500 focus:ring-red-400'
                            : 'border-gray-300'
                    )}
                >
                    {displayLabel}
                </button>

                {open && (
                    <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
                        {options.map((opt) => {
                            const isSelected = selected.includes(opt.value);
                            return (
                                <div
                                    key={opt.value}
                                    onClick={() => handleSelect(opt.value)}
                                    className={cn(
                                        'text-gray-500 px-4 py-2 cursor-pointer hover:bg-orange-100 transition flex items-center justify-between',
                                        isSelected &&
                                            'bg-orange-200 font-semibold'
                                    )}
                                >
                                    <span>{opt.label}</span>
                                    {isSelected && (
                                        <span className="text-[#FF8C00] font-bold"></span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {error && (
                <Typography
                    variant="caption"
                    color="primary"
                    weight="regular"
                    className="text-red-500 mt-1"
                >
                    {error}
                </Typography>
            )}

            {name && (
                <input
                    type="hidden"
                    name={name}
                    value={multi ? JSON.stringify(selected) : selected[0] || ''}
                />
            )}
        </Container>
    );
}
