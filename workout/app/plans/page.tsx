import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react'

async function getWorkoutPlans() {
    const res = await fetch('http://localhost:3000/api/plans', { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch workout plans')
    }
    return res.json()
}

export default async function WorkoutPlans() {
    const plans = await getWorkoutPlans()

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Workout Plans</h1>
            <Link href="/plans/new">
                <Button className="mb-4">Create New Plan</Button>
            </Link>
            <div className="space-y-4">
                {plans.map((plan: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; duration: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; description: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }) => (
                    <div key={plan.id} className="border p-4 rounded-md">
                        <h2 className="text-xl font-semibold">{plan.name}</h2>
                        <p className="text-sm text-gray-600">{plan.duration} weeks</p>
                        <p className="mt-2">{plan.description}</p>
                        <Link href={`/plans/${plan.id}`}>
                            <Button className="mt-2">View Plan</Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
};