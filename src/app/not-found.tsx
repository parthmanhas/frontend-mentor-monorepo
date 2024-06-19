import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='flex flex-col items-center space-y-5'>
                <h2>Not Found</h2>
                <p>Could not find requested resource</p>
                <Link href="/login"><Button>Return to Login Page</Button></Link>
            </div>
        </div>
    )
}