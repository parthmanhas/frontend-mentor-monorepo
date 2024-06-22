'use client';

import { signOut } from "next-auth/react"
import { Button } from "./ui/button";
import { useState } from "react";
import { BiLoaderAlt } from 'react-icons/bi';

export function SignOut() {
    const [loading, setLoading] = useState(false);
    const handleSignOut = async () => {
        setLoading(true);
        await signOut();
        setLoading(false);
    }
    return <Button className="block" onClick={handleSignOut}>
        {!loading && <>Signout</>}
        {loading && <BiLoaderAlt className="animate-spin" />}
    </Button>
}