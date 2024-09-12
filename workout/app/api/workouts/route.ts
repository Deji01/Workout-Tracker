import { NextResponse } from 'next/server'

let workouts: any[] = []

export async function GET() {
    return NextResponse.json(workouts)
}

export async function POST(request: Request) {
    const workout = await request.json()
    workout.id = Date.now()
    workouts.push(workout)
    return NextResponse.json(workout, { status: 201 })
}