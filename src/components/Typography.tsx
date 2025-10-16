'use client';

import React, { JSX } from 'react';
import { cn } from '@/lib/utils';

type TextVariant =
    | 'headline'
    | 'title'
    | 'subtitle'
    | 'text'
    | 'caption'
    | 'label';

type TextColor = 'primary' | 'black' | 'white';
type TextWeight = 'light' | 'regular' | 'semibold' | 'bold';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    variant?: TextVariant;
    color?: TextColor;
    weight?: TextWeight;
    htmlFor?: string;
    children: React.ReactNode;
}

const variantClasses: Record<TextVariant, string> = {
    headline: 'text-4xl md:text-5xl',
    title: 'text-3xl md:text-4xl',
    subtitle: 'text-xl md:text-2xl',
    text: 'text-base',
    caption: 'text-sm',
    label: 'text-sm tracking-wide',
};

const colorClasses: Record<TextColor, string> = {
    primary: 'text-[#FF8C00]',
    black: 'text-[#000]',
    white: 'text-[#FFF]',
};

const weightClasses: Record<TextWeight, string> = {
    light: 'font-light',
    regular: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold',
};

const variantTagMap: Record<TextVariant, keyof JSX.IntrinsicElements> = {
    headline: 'h1',
    title: 'h2',
    subtitle: 'h3',
    text: 'p',
    caption: 'span',
    label: 'label',
};

export function Typography({
    variant = 'text',
    color = 'black',
    weight = 'regular',
    htmlFor,
    className,
    children,
    ...props
}: TypographyProps) {
    const htmlTag = variantTagMap[variant] as keyof JSX.IntrinsicElements;
    const tagProps = variant === 'label' && htmlFor ? { htmlFor } : {};

    return React.createElement(
        htmlTag,
        {
            className: cn(
                variantClasses[variant],
                weightClasses[weight],
                colorClasses[color],
                'align-middle',
                className
            ),
            ...tagProps,
            ...props,
        },
        children
    );
}
