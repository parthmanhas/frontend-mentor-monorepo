type HandleDelete = (event: React.MouseEvent<HTMLSpanElement>, id: string) => void

interface TagComponentProps {
    name: string,
    id: string,
    onClick?: any,
    handleDelete: HandleDelete
}

export default function TagComponent({ name, id, onClick, handleDelete }: TagComponentProps) {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/json', JSON.stringify({ id, name }));
    };
    return <div className="relative mr-2 mb-2 group">
        <p id={id} onClick={onClick} draggable="true" onDragStart={handleDragStart} className="flex w-fit items-center semibold justify-center p-2 px-4 rounded-lg h-[2rem] bg-zircon-50 text-royal-blue-500 hover:text-white hover:bg-royal-blue-500 hover:cursor-pointer">{name}</p>
        <span onClick={(e) => handleDelete(e, id)} className="absolute -top-2 -right-2 cursor-pointer bg-red-500 w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center text-xs">&#10005;</span>
    </div >
}