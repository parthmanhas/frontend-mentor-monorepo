import { Label } from '@/components/ui/label';
import { SelectTrigger, Select, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { capitalize } from '@/lib/utils';
export default function CategoryInput({ categories, selectedCategoryName }: { categories: { name: string }[], selectedCategoryName?: string }) {
    return (
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <small className="text-black/40">Choose a category for your feedback</small>
            <Select required name="categoryName" defaultValue={selectedCategoryName}>
                <SelectTrigger id="category">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                    {categories.map((category, index) => <SelectItem key={index} value={category.name}>{capitalize(category.name)}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
    )
}