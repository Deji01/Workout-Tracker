'use client'

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


interface Workout {
    id: string
    name: string
    description: string
}

async function getWorkouts(): Promise<Workout[]> {
    const res = await fetch('/api/workouts')
    if (!res.ok) {
        throw new Error('Failed to fetch workouts')
    }
    return res.json()
}

export default function Workouts() {
    const { data: workouts, isLoading, error } = useQuery<Workout[], Error>({
        queryKey: ['workouts'],
        queryFn: getWorkouts,
    })

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Workouts</h1>
                <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <Skeleton className="h-4 w-[250px]" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-[200px]" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        An error occurred while fetching workouts: {error.message}
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Workouts</h1>
                <Link href="/workouts/new">
                    <Button>Add New Workout</Button>
                </Link>
            </div>
            <div className="space-y-4">
                {workouts?.map((workout) => (
                    <Card key={workout.id}>
                        <CardHeader>
                            <CardTitle>{workout.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{workout.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
};