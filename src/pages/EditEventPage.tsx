import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Card from "../components/Card";
import type { EventDetails } from "../api/types/apiTypes";
import { fetchEventDetails } from "../api/events";
import { useUpdateEvent } from "../api/useEvents";


interface EditEventPageProps {
  eventId: string;
  onNavigate: (page: string, params?: { eventId?: string }) => void;
}

const EditEventPage: React.FC<EditEventPageProps> = ({ eventId, onNavigate }) => {
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [message, setMessage] = useState("");
  const updateMutation = useUpdateEvent(); // Assuming you have a mutation hook for updating events
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EventDetails>();

  useEffect(() => {
    const loadEvent = async () => {
      setLoading(true);
      const data = await fetchEventDetails(eventId);
      if (data) {
        setValue("name", data.name);
        setValue("description", data.description || "");
        setValue("eventDate", data.eventDate.slice(0, 10)); // yyyy-mm-dd
        setValue("startTime", data.startTime.slice(11, 16)); // hh:mm
        setValue("endTime", data.endTime.slice(11, 16)); // hh:mm
        setValue("address", data.address);
        setValue("eventType", data.eventType);
        setValue("organizerName", data.organizerName);
        setValue("organizerContact", data.organizerContact);
        setValue("imageUrl", data.imageUrl || "");
      } else {
        setApiError("Failed to fetch event details.");
      }
      setLoading(false);
    };

    loadEvent();
  }, [eventId, setValue]);

  const onSubmit = async (formData: EventDetails) => {
    try {
      console.log("Updated event data:", formData);
      await updateMutation.mutateAsync({
        eventId,
        updatedData: formData,
      });
      setMessage("Event updated successfully!");
      onNavigate("event-detail", { eventId });
    } catch (err: any) {
      setApiError("Failed to update event: " + err.message);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (apiError) return <p className="text-center text-red-600">{apiError}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card title="Edit Event">
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
              {...register("eventDate", { required: true })}
              className="w-full px-4 py-2 border rounded"
              type="date"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Start Time</label>
              <input
                {...register("startTime", { required: true })}
                className="w-full px-4 py-2 border rounded"
                type="time"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">End Time</label>
              <input
                {...register("endTime", { required: true })}
                className="w-full px-4 py-2 border rounded"
                type="time"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              {...register("address", { required: true })}
              className="w-full px-4 py-2 border rounded"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Event Type</label>
            <input
              {...register("eventType", { required: true })}
              className="w-full px-4 py-2 border rounded"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Organizer Name</label>
            <input
              {...register("organizerName", { required: true })}
              className="w-full px-4 py-2 border rounded"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Organizer Contact</label>
            <input
              {...register("organizerContact", { required: true })}
              className="w-full px-4 py-2 border rounded"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input
              {...register("imageUrl")}
              className="w-full px-4 py-2 border rounded"
              type="text"
            />
          </div>

          {message && <p className="text-green-600 text-center">{message}</p>}
          {apiError && <p className="text-red-600 text-center">{apiError}</p>}

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Event
            </button>
            <button
              type="button"
              onClick={() => onNavigate("event-detail", { eventId })}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditEventPage;
