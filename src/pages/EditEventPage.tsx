import React, { useEffect, useState } from "react";
import { fetchEventDetails } from "../api/events";
import { useUpdateEvent, useUpsertEvent } from "../api/useEvents";
import EventForm from "../components/EventForm";
import type { EventDetails } from "../api/types/apiTypes";

const EditEventPage: React.FC<{
  eventId: string;
  onNavigate: (page: string, params?: { eventId?: string }) => void;
}> = ({ eventId, onNavigate }) => {
  const [eventData, setEventData] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const mutation = useUpsertEvent();

  useEffect(() => {
    const load = async () => {
      const data = await fetchEventDetails(eventId);
      setEventData(data ?? null);
      setLoading(false);
    };
    load();
  }, [eventId]);

  const handleUpdate = async (formData: EventDetails) => {
  const dateOnly = formData.eventDate;

  const formattedStartTime = new Date(`${dateOnly}T${formData.startTime}`);
  const formattedEndTime = new Date(`${dateOnly}T${formData.endTime}`);

  const payload: EventDetails = {
    ...formData,
    startTime: formattedStartTime.toISOString(),
    endTime: formattedEndTime.toISOString(),
    eventDate: new Date(dateOnly).toISOString(), 
  };

  await mutation.mutateAsync(payload);
  onNavigate("event-detail", { eventId });
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!eventData) return <p className="text-center text-red-600">Failed to load event</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <EventForm
        initialData={eventData}
        onSubmit={handleUpdate}
        isSubmitting={mutation.isPending}
        submitLabel="Update"
        onCancel={() => onNavigate("event-detail", { eventId })}
      />
    </div>
  );
};

export default EditEventPage;
