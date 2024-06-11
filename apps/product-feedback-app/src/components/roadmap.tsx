import { Status } from "@prisma/client";
export default function Roadmap({ roadmapData }: { roadmapData: { status: Status, _count: { status: number } }[] }) {

    return (
        <div className="w-[200px] p-4">
            <div className="flex justify-between">
                <p>Planned</p>
                <p>{roadmapData?.find(data => data.status === 'PLANNED')?._count.status || 0}</p>
            </div>
            <div className="flex justify-between">
                <p>In-Progress</p>
                <p>{roadmapData?.find(data => data.status === 'INPROGRESS')?._count.status || 0}</p>
            </div>
            <div className="flex justify-between">
                <p>Live</p>
                <p>{roadmapData?.find(data => data.status === 'LIVE')?._count.status || 0}</p>
            </div>
        </div>
    )
}