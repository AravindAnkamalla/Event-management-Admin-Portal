import { EventStatus } from "./types";

import React from "react";

export const getStatusBadge = (status: EventStatus) => {
  const config = {
    [EventStatus.ACTIVE]: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
    [EventStatus.COMPLETED]: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Completed' },
    [EventStatus.CANCELLED]: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
  }[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Unknown' };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

export const getRegistrationStatusBadge = (status: string) => {
  const config = {
    confirmed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Confirmed' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
  }[status.toLowerCase()] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

export const formatTime = (date: Date) =>
  new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' at ' + formatTime(date);
};
