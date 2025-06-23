import React from 'react';
import { EventStatus,type Event } from '../types';

interface EventProps {
  event: Event;
  onView: (eventId: string) => void;
  onEdit: (eventId: string) => void;
  onDelete: (eventId: number) => void;
}

const EventComponent: React.FC<EventProps> = ({ event, onView, onEdit, onDelete }) => {
  const getStatusBadge = (status: EventStatus) => {
    const statusConfig = {
      [EventStatus.ACTIVE]: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
      [EventStatus.COMPLETED]: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Completed' },
      [EventStatus.CANCELLED]: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
    };

    const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Unknown' };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const isEventEditable = (status: EventStatus) => {
    return status === EventStatus.ACTIVE;
  };

  return (
    <div className="bg-white  w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Event Image */}
      {event.imageUrl && (
        <div className="h-48 w-full bg-gray-200">
          <img 
            src={event.imageUrl} 
            alt={event.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.parentElement!.style.display = 'none';
            }}
          />
        </div>
      )}
      
      {/* Card Content */}
      <div className="p-6">
        {/* Header with Title and Status */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {event.name}
          </h3>
          {getStatusBadge(event.eventStatus)}
        </div>
        
        {/* Description */}
        {event.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {event.description}
          </p>
        )}
        
        {/* Event Details */}
        <div className="space-y-2 mb-4">
          {/* Date and Time */}
          <div className="flex items-center text-sm text-gray-700">
            <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <div className="font-medium">{new Date(event.eventDate).toLocaleDateString()}</div>
              <div className="text-xs text-gray-500">
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
              </div>
            </div>
          </div>
          
          {/* Location */}
          <div className="flex items-start text-sm text-gray-700">
            <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-2">{event.address}</span>
          </div>
          
          {/* Event Type */}
          <div className="flex items-center text-sm text-gray-700">
            <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {event.eventType}
            </span>
          </div>
          
          {/* Organizer */}
          <div className="flex items-center text-sm text-gray-700">
            <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <div>
              <div className="font-medium">{event.organizerName}</div>
              <div className="text-xs text-gray-500">{event.organizerContact}</div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onView(event.id.toString())}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-lg shadow-sm transition duration-200"
          >
            View Details
          </button>
          {isEventEditable(event.eventStatus) && (
            <>
              <button
                onClick={() => onEdit(event.id.toString())}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-2 px-3 rounded-lg shadow-sm transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(event.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-3 rounded-lg shadow-sm transition duration-200"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventComponent;