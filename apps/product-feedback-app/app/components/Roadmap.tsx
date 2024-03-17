import Link from "next/link";
import RoadmapItem from "./RoadmapItem";

export default function Roadmap() {
    return <div className="flex flex-col justify-between bg-white rounded-md p-5 overflow-y-scroll no-scrollbar">
        <div className="flex justify-between items-start flex-[0.3] mb-3">
            <h3 className="text-east-bay-900">Roadmap</h3>
            <Link href="/view-tags" className="semibold text-royal-blue-500">View</Link>
        </div>
        <div className="flex-[0.7] flex flex-col justify-end">
            <RoadmapItem status={{name: 'Planned', color: 'yellow'}} count={2} />
            <RoadmapItem status={{name: 'In-Progress' , color: 'purple'}} count={3} />
            <RoadmapItem status={{name: 'Live', color: 'blue'}} count={1} />
        </div>
    </div>
}