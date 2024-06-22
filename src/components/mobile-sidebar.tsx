import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { FeedbackNavigationMenu } from '@/components/navigation-menu';
import Link from 'next/link';
import { SignOut } from '@/components/signout';
import SelectFeedbackType from '@/components/select-feedback-type';

export function MobileSidebar({ className, allTags, roadmapData }) {
    return (
        <div className={className}>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline">Menu</Button>
                </SheetTrigger>
                <SheetContent>
                    <div className="space-y-4">
                        <FeedbackNavigationMenu tags={allTags} roadmapData={roadmapData} />
                        <SelectFeedbackType />
                        <Link href="/create">
                            <Button className="mt-4">Add Feedback</Button>
                        </Link>
                        <SignOut />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
