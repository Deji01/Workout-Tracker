'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function NewExercise() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [muscleGroup, setMuscleGroup] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, muscleGroup }),
    })

    if (response.ok) {
      router.push('/exercises')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Add New Exercise</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Exercise Name
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="muscleGroup" className="block text-sm font-medium text-gray-700">
            Muscle Group
          </label>
          <Select
            // id="muscleGroup"
            value={muscleGroup}
            onValueChange={setMuscleGroup}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Muscle Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chest">Chest</SelectItem>
              <SelectItem value="back">Back</SelectItem>
              <SelectItem value="legs">Legs</SelectItem>
              <SelectItem value="shoulders">Shoulders</SelectItem>
              <SelectItem value="arms">Arms</SelectItem>
              <SelectItem value="core">Core</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Add Exercise</Button>
      </form>
    </div>
  )
};