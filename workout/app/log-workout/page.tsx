import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Workout {
    id: string;
    name: string;
}

interface Exercise {
    id: string;
    name: string;
}

interface Set {
    weight?: string;
    reps?: string;
}

interface LogEntry {
    exerciseId: string;
    sets: Set[];
    notes: string;
}

export default function LogWorkout() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [selectedWorkout, setSelectedWorkout] = useState<string>('');
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/workouts')
            .then(res => res.json())
            .then(data => setWorkouts(data))
    }, []);

    useEffect(() => {
        if (selectedWorkout) {
            fetch(`/api/workouts/${selectedWorkout}/exercises`)
                .then(res => res.json())
                .then(data => setExercises(data))
        }
    }, [selectedWorkout]);

    const handleAddEntry = (exerciseId: string) => {
        setLogEntries([...logEntries, { exerciseId, sets: [], notes: '' }]);
    }

    const handleUpdateSet = (entryIndex: number, setIndex: number, field: keyof Set, value: string) => {
        const newEntries = [...logEntries];
        if (!newEntries[entryIndex].sets[setIndex]) {
            newEntries[entryIndex].sets[setIndex] = {};
        }
        newEntries[entryIndex].sets[setIndex][field] = value;
        setLogEntries(newEntries);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/log-workout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ workoutId: selectedWorkout, entries: logEntries }),
        });

        if (response.ok) {
            router.push('/workouts');
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Log Workout</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Select onValueChange={setSelectedWorkout}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a workout" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Workouts</SelectLabel>
                            {workouts.map((workout) => (
                                <SelectItem key={workout.id} value={workout.id}>
                                    {workout.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
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
                                    {entry.sets.map((set, setIndex) => (
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
                                            const newEntries = [...logEntries];
                                            newEntries[entryIndex].notes = e.target.value;
                                            setLogEntries(newEntries);
                                        }}
                                    />
                                </div>
                            ))}
                    </div>
                ))}
                <Button type="submit">Log Workout</Button>
            </form>
        </div>
    );
};
