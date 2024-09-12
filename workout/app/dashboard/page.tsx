import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

async function getDashboardData() {
    const res = await fetch('http://localhost:3000/api/dashboard', { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch dashboard data')
    }
    return res.json()
}

export default async function Dashboard() {
    const data = await getDashboardData()

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Workouts Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{data.workoutsCompleted}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Weight Lifted</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{data.totalWeightLifted} kg</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Streak</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{data.streak} days</p>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                <div className="flex space-x-4">
                    <Link href="/log-workout">
                        <Button>Log Workout</Button>
                    </Link>
                    <Link href="/progress">
                        <Button variant="outline">View Progress</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
};