export const metadata = {
    title: 'Guruvells Content Studio',
    description: 'Manage website content',
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
