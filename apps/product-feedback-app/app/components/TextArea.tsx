export default function TextArea({ title, subtitle }: { title: string, subtitle: string }) {
    return <div>
        <p className="font-bold text-east-bay-900">{title}</p>
        <p className="text-waikawa-gray-700 mb-3">{subtitle}</p>
        <textarea className="w-full bg-zircon-50 rounded p-3 outline-royal-blue-500" />
    </div>
}