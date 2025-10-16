'use client';

import React, { useId } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { Typography } from './Typography';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    maxLength?: number;
}

export function FormInput({
    label,
    type = 'text',
    id,
    error,
    className,
    maxLength,
    ...props
}: FormInputProps) {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
        <Container direction="column" gap={2} className="w-full">
            <Typography
                variant="label"
                color="black"
                weight="semibold"
                htmlFor={inputId}
            >
                {label}
            </Typography>

            <input
                id={inputId}
                type={type}
                maxLength={maxLength}
                className={cn(
                    'w-full border rounded-md px-4 py-3 text-gray-900 placeholder-gray-400',
                    'focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition',
                    error
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-gray-300',
                    className
                )}
                {...props}
            />

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
        </Container>
    );
}
