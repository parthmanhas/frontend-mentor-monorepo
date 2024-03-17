import clsx from "clsx";
import { Status } from "../interfaces/interface";

export default function RoadmapItem({ status, count }: { status: Status, count: number }) {
    return <div className="flex justify-between">
        <div className="flex items-center">
            <div className={clsx({
                'h-[7px] w-[7px] rounded-full mr-3': true,
                'bg-yellow-500': status.color === 'yellow',
                'bg-purple-500': status.color === 'purple',
                'bg-blue-500': status.color === 'blue',
            })}></div>
            <p className="text-waikawa-gray-700 regular-1">{status.name}</p>
        </div>
        <h4 className="text-east-bay-900">{count}</h4>
    </div>
}