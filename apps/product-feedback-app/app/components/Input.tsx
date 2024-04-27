export default function Input({ className, title, subtitle, placeholder, defaultValue, name }: { className?: string, title: string, subtitle: string, placeholder?: string, defaultValue?: string, name: string }) {
    return <div className={`${className}`}>
        <p className="font-bold text-east-bay-900">{title}</p>
        <p className="text-waikawa-gray-700 mb-2">{subtitle}</p>
        <input className="bg-zircon-50 w-full rounded p-3 outline-royal-blue-500" placeholder={placeholder} defaultValue={defaultValue} name={name} />
    </div>
}