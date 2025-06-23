import React from 'react';
import { formatTime } from '../utils';


type Props = {
  eventDate: Date;
  startTime: Date;
  endTime: Date;
  address: string;
  eventType: string;
  organizerName: string;
  organizerContact: string;
  stats: {
    REGISTERED: number;
    CANCELLED: number;
    total: number;
  };
};

const EventInfoSidebar: React.FC<Props> = ({
  eventDate, startTime, endTime, address, eventType,
  organizerName, organizerContact, stats
}) => (
  <>
    <div className="space-y-6">
      <div>
        <div className="font-medium text-gray-900">{eventDate.toDateString()}</div>
        <div className="text-sm text-gray-600">
          {formatTime(startTime)} - {formatTime(endTime)}
        </div>
      </div>

      <div className="text-gray-900">{address}</div>

      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
        {eventType}
      </span>

      <div>
        <div className="font-medium text-gray-900">{organizerName}</div>
        <div className="text-sm text-gray-600">{organizerContact}</div>
      </div>
    </div>

    <div className="mt-8 space-y-3">
      <h4 className="font-semibold">Registration Stats</h4>
      <div className="text-sm text-gray-600 flex justify-between">
        <span>Total</span><span>{stats.total}</span>
      </div>
      <div className="text-sm text-green-600 flex justify-between">
        <span>REGISTERED</span><span>{stats.REGISTERED}</span>
      </div>
      <div className="text-sm text-red-600 flex justify-between">
        <span>CANCELLED</span><span>{stats.CANCELLED}</span>
      </div>
    </div>
  </>
);

export default EventInfoSidebar;
