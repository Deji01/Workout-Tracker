'use client'

import { useState, useEffect, Key } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

export default function LogWorkout() {
    const [workouts, setWorkouts] = useState([])
    const [selectedWorkout, setSelectedWorkout] = useState('')
    const [exercises, setExercises] = useState([])
    const [logEntries, setLogEntries] = useState([])
    const router = useRouter()

    useEffect(() => {
        fetch('/api/workouts')
            .then(res => res.json())
            .then(data => setWorkouts(data))
    }, [])

    useEffect(() => {
        if (selectedWorkout) {
            fetch(`/api/workouts/${selectedWorkout}/exercises`)
                .then(res => res.json())
                .then(data => setExercises(data))
        }
    }, [selectedWorkout])

    const handleAddEntry = (exerciseId: any) => {
        setLogEntries([...logEntries, { exerciseId, sets: [], notes: '' }])
    }

    const handleUpdateSet = (entryIndex: number, setIndex: string | number, field: string, value: string) => {
        const newEntries = [...logEntries]
        if (!newEntries[entryIndex].sets[setIndex]) {
            newEntries[entryIndex].sets[setIndex] = {}
        }
        newEntries[entryIndex].sets[setIndex][field] = value
        setLogEntries(newEntries)
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const response = await fetch('/api/log-workout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ workoutId: selectedWorkout, entries: logEntries }),
        })

        if (response.ok) {
            router.push('/workouts')
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Log Workout</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Select
                    value={selectedWorkout}
                    onValueChange={setSelectedWorkout}
                    placeholder="Select a workout"
                >
                    {workouts.map((workout) => (
                        <Select.Option key={workout.id} value={workout.id}>
                            {workout.name}
                        </Select.Option>
                    ))}
                </Select>
                {exercises.map((exercise) => (
                    <div key={exercise.id} className="border p-4 rounded-md">
                        <h2 className="text-xl font-semibold">{exercise.name}</h2>
                        <Button type="button" onClick={() => handleAddEntry(exercise.id)}>
                            Add Set
                        </Button>
                        {logEntries
                            .filter((entry) => entry.exerciseId === exercise.id)
                            .map((entry, entryIndex) => (
                                <div key={entryIndex} className="mt-2 space-y-2">
                                    {entry.sets.map((set: { weight: any; reps: any; }, setIndex: Key | null | undefined) => (
                                        <div key={setIndex} className="flex space-x-2">
                                            <Input
                                                type="number"
                                                placeholder="Weight"
                                                value={set.weight || ''}
                                                onChange={(e) => handleUpdateSet(entryIndex, setIndex, 'weight', e.target.value)}
                                            />
                                            <Input
                                                type="number"
                                                placeholder="Reps"
                                                value={set.reps || ''}
                                                onChange={(e) => handleUpdateSet(entryIndex, setIndex, 'reps', e.target.value)}
                                            />
                                        </div>
                                    ))}
                                    <Input
                                        placeholder="Notes"
                                        value={entry.notes}
                                        onChange={(e) => {
                                            const newEntries = [...logEntries]
                                            newEntries[entryIndex].notes = e.target.value
                                            setLogEntries(newEntries)
                                        }}
                                    />
                                </div>
                            ))}
                    </div>
                ))}
                <Button type="submit">Log Workout</Button>
            </form>
        </div>
    )
};