import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react'

async function getWorkouts() {
    const res = await fetch('http://localhost:3000/api/workouts', { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch workouts')
    }
    return res.json()
}

export default async function Workouts() {
    const workouts = await getWorkouts()

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Workouts</h1>
            <Link href="/workouts/new">
                <Button className="mb-4">Add New Workout</Button>
            </Link>
            <div className="space-y-4">
                {workouts.map((workout: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; description: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }) => (
                    <div key={workout.id} className="border p-4 rounded-md">
                        <h2 className="text-xl font-semibold">{workout.name}</h2>
                        <p>{workout.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}