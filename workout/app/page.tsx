import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Workout Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/workouts">
          <Button className="w-full">View Workouts</Button>
        </Link>
        <Link href="/exercises">
          <Button className="w-full">Exercise Library</Button>
        </Link>
        <Link href="/progress">
          <Button className="w-full">Track Progress</Button>
        </Link>
        <Link href="/plans">
          <Button className="w-full">Workout Plans</Button>
        </Link>
      </div>
    </div>
  )
};