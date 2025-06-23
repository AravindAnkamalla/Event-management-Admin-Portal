import React from "react";
import { useEvent } from "../api/useEvents";
import Card from "../components/Card";
import EventHeader from "../components/EventHeader";
import EventInfoSidebar from "../components/EventInfoSidebar";
import RegisteredUsersTable from "../components/RegisteredUsersTable";
import { EventStatus } from "../types";

interface EventDetailsPageProps {
  eventId: string;
  onNavigate: (page: string, params?: { eventId?: string }) => void;
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = ({
  eventId,
  onNavigate,
}) => {
  const { data: event, isLoading, isError } = useEvent(eventId);

  if (isLoading)
    return (
      <p className="text-center text-gray-700">Loading event details...</p>
    );
  if (isError || !event)
    return <p className="text-center text-red-600">Failed to load event.</p>;
  console.log("Event details:", JSON.stringify(event, null, 4));
  console.log("console log event name", event.name);
  const isEditable = event.eventStatus === EventStatus.ACTIVE;

  const stats = {
    total: event.registeredUsers?.length || 0,
    REGISTERED:
      event.registeredUsers?.filter(
        (u) => u.registrationStatus.toLowerCase() === "registered"
      ).length || 0,
    CANCELLED:
      event.registeredUsers?.filter(
        (u) => u.registrationStatus.toLowerCase() === "cancelled"
      ).length || 0,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side with header and users */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Event Information">
            <EventHeader
              name={event.name}
              imageUrl={event.imageUrl}
              description={event.description}
              status={event.eventStatus as EventStatus}
              isEditable={isEditable}
              onEdit={() =>
                onNavigate("edit-event", { eventId: event.id.toString() })
              }
              onDelete={() => {
                if (confirm("Are you sure you want to delete this event?")) {
                  // TODO: integrate actual delete mutation
                  alert("Event deleted.");
                  onNavigate("events");
                }
              }}
            />
          </Card>

          <Card title={`Registered Users (${event.registeredUsers?.length})`}>
            <RegisteredUsersTable users={event?.registeredUsers} />
          </Card>
        </div>

        {/* Right side sidebar */}
        <Card title="Event Overview">
          <EventInfoSidebar
            eventDate={new Date(event.eventDate)}
            startTime={new Date(event.startTime)}
            endTime={new Date(event.endTime)}
            address={event.address}
            eventType={event.eventType}
            organizerName={event.organizerName}
            organizerContact={event.organizerContact}
            stats={stats}
          />
        </Card>
      </div>
      <button
        onClick={() => onNavigate("events")}
        className="p-6 mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        ← Back to Events
      </button>
    </div>
  );
};

export default EventDetailsPage;
