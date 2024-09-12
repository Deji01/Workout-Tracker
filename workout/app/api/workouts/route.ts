import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const workouts = await prisma.workout.findMany({
      include: { exercises: true }
    })
    return NextResponse.json(workouts)
  } catch (error) {
    console.error('Failed to fetch workouts:', error)
    return NextResponse.json({ error: 'Failed to fetch workouts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, exercises, userId } = await request.json()
    const workout = await prisma.workout.create({
      data: {
        name,
        description,
        user: { connect: { id: userId } },
        exercises: {
          connect: exercises.map((id: string) => ({ id }))
        }
      },
      include: { exercises: true }
    })
    return NextResponse.json(workout, { status: 201 })
  } catch (error) {
    console.error('Failed to create workout:', error)
    return NextResponse.json({ error: 'Failed to create workout' }, { status: 500 })
  }
}