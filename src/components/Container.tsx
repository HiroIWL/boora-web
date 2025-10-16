'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useUserType } from '@/context/UserTypeContext';

type ContainerBg = 'primary' | 'secondary' | 'white' | 'transparent';
type Direction = 'row' | 'column';
type Align = 'start' | 'center' | 'end' | 'stretch' | 'none';
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
type Padding = 'none' | 'xs' | 'sm' | 'md' | 'lg';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    bg?: ContainerBg;
    direction?: Direction;
    gap?: number | string;
    align?: Align;
    justify?: Justify;
    wrap?: boolean;
    rounded?: boolean;
    shadow?: boolean;
    padding?: Padding;
    fluid?: boolean;
    children: React.ReactNode;
}

const bgClasses: Record<ContainerBg, string> = {
    primary: 'bg-[#FF8C00]',
    secondary: 'bg-[#4CAF4F]',
    white: 'bg-white',
    transparent: 'bg-transparent',
};

const alignClasses: Record<Align, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    none: '',
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
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6 md:p-8',
    lg: 'p-10 md:p-16',
};

export function Container({
    bg = 'transparent',
    direction = 'row',
    gap = 0,
    align = 'start',
    justify = 'start',
    wrap = false,
    rounded = false,
    shadow = false,
    padding = 'none',
    fluid = false,
    className,
    children,
    ...props
}: ContainerProps) {
    const { userType } = useUserType();
    let bgClassesByUser = bgClasses;

    if (userType && userType === 'ALUNO') {
        bgClassesByUser = {
            ...bgClassesByUser,
            primary: bgClasses.secondary,
            secondary: bgClasses.primary,
        };
    }

    return (
        <div
            className={cn(
                'flex',
                direction === 'row' ? 'flex-row' : 'flex-col',
                alignClasses[align],
                justifyClasses[justify],
                bgClassesByUser[bg],
                paddingClasses[padding],
                rounded && 'rounded-lg',
                shadow && 'shadow-sm shadow-black/10 z-[1000]',
                wrap && 'flex-wrap',
                !fluid ? 'max-w-7xl mx-auto' : 'w-full',
                typeof gap === 'number' ? `gap-${gap}` : gap,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
