'use client';

import Link from 'next/link';
import React from 'react';
import { BaseButtonProps, ButtonBase, getButtonClasses } from './ButtonBase';

export type ButtonLinkProps = BaseButtonProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
    };

export function ButtonLink({
    href,
    variant = 'primary',
    textColor = 'black',
    iconSrc,
    iconAlt,
    className,
    children,
    target,
    rel,
    ...props
}: ButtonLinkProps) {
    return (
        <Link
            href={href}
            target={target}
            rel={rel}
            className={getButtonClasses(variant, textColor, className)}
            {...props}
        >
            <ButtonBase iconSrc={iconSrc} iconAlt={iconAlt}>
                {children}
            </ButtonBase>
        </Link>
    );
}
