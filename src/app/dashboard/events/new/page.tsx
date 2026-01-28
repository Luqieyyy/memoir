'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts';
import { EventForm } from '@/components/events';
import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';

export default function NewEventPage() {
  const router = useRouter();
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>
      </div>

      {/* Event Form */}
      <EventForm
        ownerId={user.uid}
        onSuccess={(eventId) => {
          router.push(`/dashboard/events/${eventId}`);
        }}
        onCancel={() => router.back()}
      />
    </div>
  );
}
