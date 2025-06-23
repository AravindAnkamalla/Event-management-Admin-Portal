import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { EventDetails } from "../api/types/apiTypes";
import { EventStatus } from "../types";
import Card from "./Card";

interface EventFormProps {
  initialData?: Partial<EventDetails>;
  onSubmit: (data: EventDetails) => Promise<void>;
  isSubmitting: boolean;
  submitLabel: string;
  onCancel: () => void;
}

const eventStatusOptions: EventStatus[] = [EventStatus.ACTIVE, EventStatus.COMPLETED, EventStatus.CANCELLED];

const EventForm: React.FC<EventFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
  submitLabel,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EventDetails>();

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        if (value !== undefined) {
          // @ts-ignore - setting values dynamically
          setValue(key, value);
        }
      });
    }
  }, [initialData, setValue]);

  return (
    <Card title={`${submitLabel} Event`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Event Name</label>
          <input
            {...register("name", { required: "Event name is required" })}
            className="w-full px-4 py-2 border rounded"
            type="text"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 border rounded"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Event Date</label>
          <input
            {...register("eventDate", { required: "Date is required" })}
            className="w-full px-4 py-2 border rounded"
            type="date"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Start Time</label>
            <input
              {...register("startTime", { required: "Start time is required" })}
              className="w-full px-4 py-2 border rounded"
              type="time"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">End Time</label>
            <input
              {...register("endTime", { required: "End time is required" })}
              className="w-full px-4 py-2 border rounded"
              type="time"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            {...register("address", { required: "Address is required" })}
            className="w-full px-4 py-2 border rounded"
            type="text"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Event Status</label>
          <select
            {...register("eventStatus", { required: "Status is required" })}
            className="w-full px-4 py-2 border rounded"
          >
            {eventStatusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Event Type</label>
          <input
            {...register("eventType", { required: "Type is required" })}
            className="w-full px-4 py-2 border rounded"
            type="text"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Organizer Name</label>
          <input
            {...register("organizerName", { required: "Organizer is required" })}
            className="w-full px-4 py-2 border rounded"
            type="text"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Organizer Contact</label>
          <input
            {...register("organizerContact", { required: "Contact is required" })}
            className="w-full px-4 py-2 border rounded"
            type="text"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            {...register("imageUrl")}
            className="w-full px-4 py-2 border rounded"
            type="url"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isSubmitting ? `${submitLabel}...` : submitLabel}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </Card>
  );
};

export default EventForm;
