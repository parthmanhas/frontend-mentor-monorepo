import { fetcher } from '@/app/utils/utils';
import { Category } from '@prisma/client';
import useSWR from 'swr';

export default function Categories() {
    const { data, error, isLoading } = useSWR('/api/categories', fetcher)
    const categories = data?.categories;

    if (error) {
        console.error(error);
        return <LoadingCategorySkeleton />
    }
    if (isLoading) return <LoadingCategorySkeleton />

    return <div>
        <h3>Category</h3>
        <p className="mt-1">Choose a category for your feedback</p>
        <select className="w-full mb-5 outline-royal-blue-500 rounded-sm" name="category">
            {categories?.map((category: Category, index: number) => <option key={index} value={category.name}>{category.name.toUpperCase()}</option>)}
        </select>
    </div>
}

export function LoadingCategorySkeleton() {
    return <div className="w-full mb-5 outline-royal-blue-500 rounded-sm bg-gray-200 h-20 animate-pulse">
    </div>;
}