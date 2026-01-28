'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Textarea, Card } from '@/components/ui';
import { useCreateEvent } from '@/lib/hooks';
import { formatDateForInput } from '@/lib/utils';
import { Calendar, MapPin, User, MessageSquare, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface EventFormProps {
  ownerId: string;
  onSuccess?: (eventId: string) => void;
  onCancel?: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({ ownerId, onSuccess, onCancel }) => {
  const router = useRouter();
  const { create, loading } = useCreateEvent(ownerId);

  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    weddingDate: formatDateForInput(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)), // 30 days from now
    venue: '',
    welcomeMessage: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.brideName.trim()) {
      newErrors.brideName = 'Bride name is required';
    }
    if (!formData.groomName.trim()) {
      newErrors.groomName = 'Groom name is required';
    }
    if (!formData.weddingDate) {
      newErrors.weddingDate = 'Wedding date is required';
    }
    if (!formData.venue.trim()) {
      newErrors.venue = 'Venue is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const newEvent = await create({
        brideName: formData.brideName.trim(),
        groomName: formData.groomName.trim(),
        weddingDate: new Date(formData.weddingDate),
        venue: formData.venue.trim(),
        welcomeMessage: formData.welcomeMessage.trim(),
      });

      toast.success('Wedding event created successfully! 🎉');
      
      if (onSuccess) {
        onSuccess(newEvent.id);
      } else {
        router.push(`/dashboard/events/${newEvent.id}`);
      }
    } catch (error) {
      toast.error('Failed to create event. Please try again.');
    }
  };

  return (
    <Card className="max-w-2xl mx-auto" padding="lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
          <Sparkles className="w-6 h-6 text-primary-600" />
        </div>
        <h2 className="text-2xl font-display font-semibold text-secondary-800">
          Create Your Wedding Event
        </h2>
        <p className="text-secondary-500 mt-2">
          Set up your wedding details and get your unique QR code
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Couple Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Bride's Name"
            name="brideName"
            value={formData.brideName}
            onChange={handleChange}
            error={errors.brideName}
            placeholder="Enter bride's name"
            icon={<User className="w-4 h-4" />}
          />
          <Input
            label="Groom's Name"
            name="groomName"
            value={formData.groomName}
            onChange={handleChange}
            error={errors.groomName}
            placeholder="Enter groom's name"
            icon={<User className="w-4 h-4" />}
          />
        </div>

        {/* Wedding Date */}
        <Input
          label="Wedding Date"
          name="weddingDate"
          type="date"
          value={formData.weddingDate}
          onChange={handleChange}
          error={errors.weddingDate}
          icon={<Calendar className="w-4 h-4" />}
        />

        {/* Venue */}
        <Input
          label="Venue"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          error={errors.venue}
          placeholder="Enter wedding venue"
          icon={<MapPin className="w-4 h-4" />}
        />

        {/* Welcome Message */}
        <div>
          <Textarea
            label="Welcome Message (Optional)"
            name="welcomeMessage"
            value={formData.welcomeMessage}
            onChange={handleChange}
            placeholder="Write a warm message for your guests..."
            rows={4}
            hint="This message will be displayed when guests scan the QR code"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          )}
          <Button type="submit" loading={loading} className="flex-1">
            Create Event & Generate QR Code
          </Button>
        </div>
      </form>
    </Card>
  );
};
