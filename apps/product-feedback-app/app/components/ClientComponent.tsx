// This is your client component
"use client";
import { useState } from "react";

export default function ClientComponent({ message }) {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h2>Client Component</h2>
            <p>{message}</p>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}