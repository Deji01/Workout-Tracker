import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react';

async function getSocialFeed() {
  const res = await fetch('http://localhost:3000/api/social', { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch social feed')
  }
  return res.json()
}

export default async function SocialFeed() {
  const feed = await getSocialFeed()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Social Feed</h1>
      <div className="space-y-4">
        {feed.map((post: { id: any; user: { avatar: any; name: any[] }; content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; workoutName: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={post.user.avatar} alt={post.user.name as unknown as string} />
                  <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle>{post.user.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
              {post.workoutName && (
                <p className="text-sm text-gray-600 mt-2">Workout: {post.workoutName}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
};