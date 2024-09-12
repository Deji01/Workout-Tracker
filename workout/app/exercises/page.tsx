import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react'

async function getExercises() {
    const res = await fetch('http://localhost:3000/api/exercises', { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch exercises')
    }
    return res.json()
};

export default async function Exercises() {
    const exercises = await getExercises()

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Exercise Library</h1>
            <Link href="/exercises/new">
                <Button className="mb-4">Add New Exercise</Button>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exercises.map((exercise: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; muscleGroup: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; description: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }) => (
                    <div key={exercise.id} className="border p-4 rounded-md">
                        <h2 className="text-xl font-semibold">{exercise.name}</h2>
                        <p className="text-sm text-gray-600">{exercise.muscleGroup}</p>
                        <p className="mt-2">{exercise.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};