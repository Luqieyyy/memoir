'use client';

import React, { useState, useRef } from 'react';
import { Button, Input, Textarea, Card, ProgressBar } from '@/components/ui';
import { useWishes, usePhotos } from '@/lib/hooks';
import { validateImageFile, createImagePreview, revokeImagePreview } from '@/lib/utils';
import { User, MessageSquare, Camera, X, Send, Upload, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { AIWishGenerator } from './AIWishGenerator';

interface GuestSubmissionFormProps {
  eventId: string;
  onSuccess?: () => void;
  brideName?: string;
  groomName?: string;
}

export const GuestSubmissionForm: React.FC<GuestSubmissionFormProps> = ({
  eventId,
  onSuccess,
  brideName = 'Pengantin',
  groomName = 'Pengantin',
}) => {
  const { addWish, adding: addingWish } = useWishes(eventId);
  const { uploadPhotos, uploading, uploadProgress } = usePhotos(eventId);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    guestName: '',
    message: '',
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // AI Wish Generator Handler
  const handleAIWishSelect = (wish: string) => {
    setFormData((prev) => ({ ...prev, message: wish }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Validate each file
    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    for (const file of files) {
      const validation = validateImageFile(file, { maxSizeMB: 15 });
      if (!validation.valid) {
        toast.error(`${file.name}: ${validation.error}`);
        continue;
      }
      validFiles.push(file);
      newPreviews.push(createImagePreview(file));
    }

    if (validFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    revokeImagePreview(previews[index]);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.guestName.trim()) {
      newErrors.guestName = 'Please enter your name';
    }

    if (!formData.message.trim() && selectedFiles.length === 0) {
      newErrors.message = 'Please write a message or share some photos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Submit wish if message is provided
      if (formData.message.trim()) {
        await addWish({
          guestName: formData.guestName.trim(),
          message: formData.message.trim(),
        });
      }

      // Upload photos if any
      if (selectedFiles.length > 0) {
        await uploadPhotos(formData.guestName.trim(), selectedFiles);
      }

      // Clean up previews
      previews.forEach(revokeImagePreview);

      setSubmitted(true);
      toast.success('Thank you for sharing your memories! 💕');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({ guestName: '', message: '' });
    setSelectedFiles([]);
    setPreviews([]);
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <Card className="max-w-lg mx-auto text-center" padding="lg">
        <div className="py-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">💝</span>
          </div>
          <h3 className="text-2xl font-display font-semibold text-secondary-800 mb-3">
            Thank You!
          </h3>
          <p className="text-secondary-600 mb-6">
            Your wishes and photos have been shared with the happy couple.
            They'll treasure these memories forever!
          </p>
          <Button onClick={resetForm} variant="outline">
            Share More Memories
          </Button>
        </div>
      </Card>
    );
  }

  const isSubmitting = addingWish || uploading;

  return (
    <Card className="max-w-lg mx-auto" padding="lg">
      <div className="text-center mb-6">
        <h3 className="text-xl font-display font-semibold text-secondary-800 mb-2">
          Share Your Wishes
        </h3>
        <p className="text-secondary-500 text-sm">
          Leave a heartfelt message and share your favorite photos
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Guest Name */}
        <Input
          label="Your Name"
          name="guestName"
          value={formData.guestName}
          onChange={handleChange}
          error={errors.guestName}
          placeholder="Enter your name"
          icon={<User className="w-4 h-4" />}
          disabled={isSubmitting}
        />

        {/* Message with AI Generator */}
        <div className="space-y-2">
          <AIWishGenerator
            onSelect={handleAIWishSelect}
            brideName={brideName}
            groomName={groomName}
          />
          <Textarea
            label="Your Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            placeholder="Write your wishes for the happy couple..."
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Share Photos (Optional)
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={isSubmitting}
          />

          {/* Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isSubmitting}
            className="w-full border-2 border-dashed border-secondary-300 rounded-lg p-6 text-center hover:border-primary-400 hover:bg-primary-50/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Camera className="w-8 h-8 text-secondary-400 mx-auto mb-2" />
            <p className="text-sm text-secondary-600">
              Click to select photos or drag and drop
            </p>
            <p className="text-xs text-secondary-400 mt-1">
              JPEG, PNG, WebP up to 15MB each
            </p>
          </button>

          {/* Selected Files Preview */}
          {previews.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {previews.map((preview, index) => (
                <div key={index} className="relative group aspect-square">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={isSubmitting}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Progress */}
          {uploading && (
            <div className="mt-4">
              <ProgressBar progress={uploadProgress} showLabel />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          icon={<Send className="w-4 h-4" />}
          size="lg"
          className="mt-6"
        >
          {isSubmitting ? 'Sending...' : 'Send Wishes'}
        </Button>
      </form>
    </Card>
  );
};
