'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    const router = useRouter();
    const { data, status } = useSession();
    console.log(data)
    console.log(status)

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            <h2 className='text-lg'>Something went wrong!</h2>
            <div className="space-x-4">
                <Button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </Button>
                {status !== 'authenticated' && <Button
                    onClick={
                        () => router.replace('/login')
                    }
                >
                    Go to Login Page
                </Button>}
                {status === 'authenticated' && <Button
                    onClick={
                        () => router.replace('/home')
                    }
                >
                    Go to Home Page
                </Button>}
            </div>
        </div >
    )
}