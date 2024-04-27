import { fetcher } from '@/app/utils/utils';
import { Category } from '@prisma/client';
import useSWR from 'swr';

export default function Statuses({ className, defaultValue }: { className?: string, defaultValue?: string }) {

    const STATUSES = ['PLANNED', 'INPROGRESS', 'LIVE'];

    return <div className={className}>
        <h3 className="text-east-bay-900">Update Status</h3>
        <p className="mt-1 text-waikawa-gray-700">Change Feedback State</p>
        <select className="w-full mb-5 outline-royal-blue-500 rounded-sm" name="status" defaultValue={defaultValue}>
            {STATUSES?.map((status: string, index: number) => <option key={index} value={status}>{status[0] + status.slice(1).toLowerCase()}</option>)}
        </select>
    </div>
}