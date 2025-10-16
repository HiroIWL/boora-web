import './globals.css';
import { Josefin_Sans } from 'next/font/google';
import { UserTypeProvider } from '@/context/UserTypeContext';
import { UserProvider } from '@/context/UserContext';
import { AuthenticatedProvider } from '@/context/AuthenticatedContext';

const josefin = Josefin_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-josefin',
});

export const metadata = {
    title: 'Boora',
    description: '',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${josefin.variable} ${josefin.variable} antialiased !bg-white`}
            >
                <AuthenticatedProvider>
                    <UserTypeProvider>
                        <UserProvider>{children}</UserProvider>
                    </UserTypeProvider>
                </AuthenticatedProvider>
            </body>
        </html>
    );
}
