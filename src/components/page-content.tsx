export default function PageContent({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <main className={`flex flex-col max-w-[1280px] mx-auto min-h-screen ${className}`}>
            {children}
        </main>
    )
}