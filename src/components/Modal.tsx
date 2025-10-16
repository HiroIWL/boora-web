'use client';

import { ReactNode, useEffect } from 'react';
import { Container } from './Container';
import { cn } from '@/lib/utils';

interface ModalProps {
    open?: boolean;
    onClose?: () => void;
    children: ReactNode;
    className?: string;
}

export function Modal({
    open = true,
    onClose,
    children,
    className,
}: ModalProps) {
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === 'Escape' && onClose) onClose();
        }
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    if (!open) return null;

    return (
        <Container
            onClick={onClose}
            align="center"
            justify="center"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            fluid
        >
            <Container
                onClick={(e) => e.stopPropagation()}
                direction="column"
                bg="white"
                padding="md"
                gap={4}
                className={cn(
                    'rounded-2xl shadow-lg w-full max-w-md animate-fadeIn',
                    className
                )}
            >
                {children}
            </Container>
        </Container>
    );
}
