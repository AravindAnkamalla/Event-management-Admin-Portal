import React from "react";
import { useUpsertEvent } from "../api/useEvents";
import EventForm from "../components/EventForm";
import type { EventDetails } from "../api/types/apiTypes";

const CreateEventPage: React.FC<{ onNavigate: (page: string) => void }> = ({
  onNavigate,
}) => {
  const upsertMutation = useUpsertEvent();

  const handleSubmit = async (formData: EventDetails) => {
    const dateOnly = formData.eventDate;

    const formattedStartTime = new Date(`${dateOnly}T${formData.startTime}`);
    const formattedEndTime = new Date(`${dateOnly}T${formData.endTime}`);

    const payload: EventDetails = {
      ...formData,
      startTime: formattedStartTime.toISOString(),
      endTime: formattedEndTime.toISOString(),
      eventDate: new Date(dateOnly).toISOString(),
    };

    await upsertMutation.mutateAsync(payload);
    onNavigate("events");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <EventForm
        onSubmit={handleSubmit}
        isSubmitting={upsertMutation.isPending}
        submitLabel="Create"
        onCancel={() => onNavigate("events")}
      />
    </div>
  );
};

export default CreateEventPage;
