export default function Logo() {
    // p-5 on container does not work, width of equal containers changes
    return <div className="md:rounded-xl md:inline-flex md:flex-col md:justify-end relative overflow-hidden">
        <div className="bg-gradient-radial from-pink-500 via-purple-700 to-blue-500 absolute h-[200%] w-[200%] md:h-[175%] md:w-[175%] z-0">
            <h2 className="pl-5 pt-3 z-20">Frontend Mentor</h2>
            <p className="text-sm font-light pl-5 z-20">Feedback Board</p>
        </div>
        <div className="hidden md:block bg-gradient-radial from-[#7AD8FB] to-white absolute md:h-[100%] md:w-[100%] blur-3xl rounded-full translate-x-[-65%] translate-y-[-65%] z-10"></div>
        <div className="hidden md:block bg-gradient-radial bg-[#FBB57A] to-white absolute md:h-[100%] md:w-[100%] blur-3xl rounded-full translate-x-[65%] translate-y-[65%] z-10"></div>
        <h1 className="md:pl-6 z-20">Frontend Mentor</h1>
        <p className="text-sm font-light md:pl-6 pb-6 z-20">Feedback Board</p>
    </div>
}