import React, { useState } from 'react';
import { useEvents } from '../api/useEvents';
import Card from '../components/Card';

import type { Event } from '../types';
import EventComponent from '../components/EventComponent';

const EventsPage: React.FC<{ onNavigate: (page: string, params?: { eventId?: string }) => void }> = ({ onNavigate }) => {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data: events, isLoading, isError } = useEvents(page, limit);

  const handleDelete = async (eventId: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        // await deleteMutation.mutateAsync(eventId.toString());
        alert('Event deleted successfully!');
      } catch (error) {
        alert('Failed to delete event: ' + error);
      }
    }
  };

  const handleView = (eventId: string) => {
    onNavigate('event-detail', { eventId });
  };

  const handleEdit = (eventId: string) => {
    onNavigate('edit-event', { eventId });
  };

  if (isLoading) return <p className="text-center text-gray-700">Loading events...</p>;
  if (isError) return <p className="text-center text-red-600">Error loading events.</p>;

  return (
    <div className="p-2">
      <Card title="All Events">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            Total Events: {events?.total || 0}
          </div>
          <button
            onClick={() => onNavigate('create-event')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-200"
          >
            Create New Event
          </button>
        </div>

        {(!events || events?.events.length === 0) ? (
          <p className="text-gray-600">No events found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.events.map((event: Event) => (
                <EventComponent
                  key={event.id}
                  event={event}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            <div className="flex justify-center mt-6 gap-4 items-center">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-gray-700">
                Page {page} of {events.totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, events.totalPages))}
                disabled={page === events.totalPages}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default EventsPage;
