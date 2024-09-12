'use client'

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function Notifications() {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        fetch('/api/notifications')
            .then(res => res.json())
            .then(data => setNotifications(data))
    }, [])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="space-y-2">
                    {notifications.map((notification: { id: string, message: string }) => (
                        <div key={notification.id as string} className="p-2 bg-gray-100 rounded">
                            <p className="text-sm">{notification.message as string}</p>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
};