type ContentProps = {
    children: React.ReactNode,
    className?: string
}

export default function Content({ children, className }: ContentProps) {
    return <div className={`${className}`}>{children}</div>
}