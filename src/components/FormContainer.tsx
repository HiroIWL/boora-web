'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type Direction = 'row' | 'column';
type Align = 'start' | 'center' | 'end' | 'stretch';
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
type Padding = 'none' | 'sm' | 'md' | 'lg';

interface FormContainerProps extends React.FormHTMLAttributes<HTMLFormElement> {
    direction?: Direction;
    align?: Align;
    justify?: Justify;
    gap?: number | string;
    padding?: Padding;
    shadow?: boolean;
    rounded?: boolean;
    children: React.ReactNode;
}

const alignClasses: Record<Align, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
};

const justifyClasses: Record<Justify, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
};

const paddingClasses: Record<Padding, string> = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6 md:p-8',
    lg: 'p-10 md:p-16',
};

export function FormContainer({
    direction = 'column',
    align = 'stretch',
    justify = 'start',
    gap = 0,
    padding = 'none',
    shadow = false,
    rounded = false,
    className,
    children,
    ...props
}: FormContainerProps) {
    return (
        <form
            className={cn(
                'flex w-full',
                direction === 'row' ? 'flex-row' : 'flex-col',
                alignClasses[align],
                justifyClasses[justify],
                paddingClasses[padding],
                rounded && 'rounded-lg',
                shadow && 'shadow-md',
                typeof gap === 'number' ? `gap-${gap}` : gap,
                className
            )}
            {...props}
        >
            {children}
        </form>
    );
}
