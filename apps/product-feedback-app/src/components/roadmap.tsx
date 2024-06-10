export default function Roadmap({ roadmapData }) {

    return (
        <div className="w-[200px] p-4">
            <div className="flex justify-between mb-5 font-semibold">
                <p>Roadmap</p>
                <p>View</p>
            </div>
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