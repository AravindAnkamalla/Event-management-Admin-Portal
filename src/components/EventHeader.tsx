import React from 'react';
import { EventStatus } from '../types';
import { getStatusBadge } from '../utils';

type Props = {
  name: string;
  imageUrl?: string;
  description?: string;
  status: EventStatus;
  isEditable: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

const EventHeader: React.FC<Props> = ({
  name, imageUrl, description, status, isEditable, onEdit, onDelete
}) => (
  console.log(name, imageUrl, description, status, isEditable, onEdit, onDelete),
  <div>
    {imageUrl && (
      <div className="h-64 w-full bg-gray-200 rounded-lg mb-6 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.parentElement!.style.display = 'none')}
        />
      </div>
    )}

    <div className="flex justify-between items-start mb-4">
      <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
      {getStatusBadge(status)}
    </div>

    {description && <p className="text-gray-700 text-lg mb-6">{description}</p>}

    <div className="flex gap-3 flex-wrap">
      {isEditable && (
        <>
          <button onClick={onEdit} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg shadow-sm">Edit</button>
          <button onClick={onDelete} className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg shadow-sm">Delete</button>
        </>
      )}
      <button onClick={() => window.print()} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg shadow-sm">Print</button>
    </div>
  </div>
);

export default EventHeader;
