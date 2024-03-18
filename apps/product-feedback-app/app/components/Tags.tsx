import Tag from "./Tag";

export default function Tags() {
    return <div className="flex items-start content-start flex-wrap bg-white rounded-lg p-5 overflow-y-scroll no-scrollbar">
        <Tag name="All" />
        <Tag name="UI" />
        <Tag name="UX" />
        <Tag name="Enhancement" />
        <Tag name="Feature" />
        <Tag name="Bug" />
    </div>
}