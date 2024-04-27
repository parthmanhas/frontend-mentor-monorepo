export default function Tag({ name, id }: { name: string, id: string }) {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', id);
    };
    return <p id={id} draggable="true" onDragStart={handleDragStart} className="flex w-fit items-center semibold mr-2 mb-2 justify-center p-2 px-4 rounded-lg h-[2rem] bg-zircon-50 text-royal-blue-500 hover:text-white hover:bg-royal-blue-500 hover:cursor-pointer">{name}</p>
}