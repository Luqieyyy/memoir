'use client';

import React from 'react';
import Link from 'next/link';
import { WeddingEvent, EventStats } from '@/types';
import { Card, Badge, Button } from '@/components/ui';
import { formatDate, getDaysUntil, isDateInPast } from '@/lib/utils';
import {
  Calendar,
  MapPin,
  Users,
  Heart,
  Image,
  ExternalLink,
  Edit,
  Trash2,
  QrCode,
} from 'lucide-react';

interface EventCardProps {
  event: WeddingEvent;
  stats?: EventStats;
  onEdit?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
  showActions?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  stats,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  const isPast = isDateInPast(event.weddingDate);
  const daysUntil = getDaysUntil(event.weddingDate);

  const getStatusBadge = () => {
    if (!event.isActive) {
      return <Badge variant="default">Inactive</Badge>;
    }
    if (isPast) {
      return <Badge variant="success">Completed</Badge>;
    }
    if (daysUntil === 0) {
      return <Badge variant="warning">Today!</Badge>;
    }
    if (daysUntil <= 7) {
      return <Badge variant="info">{daysUntil} days left</Badge>;
    }
    return <Badge variant="success">Upcoming</Badge>;
  };

  return (
    <Card hover className="overflow-hidden">
      {/* Header with couple names */}
      <div className="p-6 bg-gradient-romantic border-b border-primary-100">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-display font-semibold text-secondary-800 mb-1">
              {event.brideName} & {event.groomName}
            </h3>
            <div className="flex items-center gap-2 text-sm text-secondary-500">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event.weddingDate)}</span>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </div>

      {/* Event Details */}
      <div className="p-6 space-y-4">
        {/* Venue */}
        <div className="flex items-start gap-3 text-secondary-600">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{event.venue}</span>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-4 py-4 border-y border-secondary-100">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary-600 mb-1">
                <Users className="w-4 h-4" />
              </div>
              <p className="text-2xl font-semibold text-secondary-800">{stats.totalGuests}</p>
              <p className="text-xs text-secondary-500">Guests</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary-600 mb-1">
                <Heart className="w-4 h-4" />
              </div>
              <p className="text-2xl font-semibold text-secondary-800">{stats.totalWishes}</p>
              <p className="text-xs text-secondary-500">Wishes</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary-600 mb-1">
                <Image className="w-4 h-4" />
              </div>
              <p className="text-2xl font-semibold text-secondary-800">{stats.totalPhotos}</p>
              <p className="text-xs text-secondary-500">Photos</p>
            </div>
          </div>
        )}

        {/* QR Code Link */}
        <div className="flex items-center gap-2 p-3 bg-secondary-50 rounded-lg">
          <QrCode className="w-4 h-4 text-secondary-500" />
          <code className="text-xs text-secondary-600 truncate flex-1">
            {event.qrCodeUrl}
          </code>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex flex-wrap gap-2 pt-2">
            <Link href={`/dashboard/events/${event.id}`} className="flex-1">
              <Button variant="primary" size="sm" fullWidth icon={<ExternalLink className="w-4 h-4" />}>
                View Details
              </Button>
            </Link>
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(event.id)}
                icon={<Edit className="w-4 h-4" />}
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(event.id)}
                icon={<Trash2 className="w-4 h-4 text-red-500" />}
              />
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
