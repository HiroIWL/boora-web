'use client';

import React from 'react';
import { BaseButtonProps, ButtonBase, getButtonClasses } from './ButtonBase';

export type ButtonProps = BaseButtonProps &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
    variant = 'primary',
    textColor = 'black',
    iconSrc,
    iconAlt,
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            type={props.type ?? 'button'}
            className={getButtonClasses(variant, textColor, className)}
            {...props}
        >
            <ButtonBase iconSrc={iconSrc} iconAlt={iconAlt}>
                {children}
            </ButtonBase>
        </button>
    );
}
