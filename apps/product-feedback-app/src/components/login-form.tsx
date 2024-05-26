"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function LoginForm({ users }: { users: { name: string, email: string, username: string }[] }) {

    const router = useRouter();

    const handleSubmit = (userId: string) => {
        router.push(`/home?user=${userId}`)
    }

    return (
        <form>
            <Select onValueChange={handleSubmit}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {users?.map((user, index) => <Link href={`/home/user=${user.email}`}>
                            <SelectItem key={index} value={user.email}>{user.email}</SelectItem>
                        </Link>)}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </form>
    )
}