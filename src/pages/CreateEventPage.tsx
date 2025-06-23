import React, { useState } from 'react';
import Card from '../components/Card';
import { useAddEvent } from '../api/useEvents';
import type { EventStatus } from '../types';

const initialState = {
  name: '',
  description: '',
  eventDate: '',
  startTime: '',
  endTime: '',
  address: '',
  eventStatus: 'ACTIVE',
  eventType: '',
  organizerName: '',
  organizerContact: '',
  imageUrl: ''
};

const eventStatusOptions = ['ACTIVE', 'COMPLETED', 'CANCELLED'];

const CreateEventPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const addMutation = useAddEvent();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');


    try {
      const payload = {
        ...form,
        eventDate: new Date(form.eventDate),
        startTime: new Date(form.startTime),
        endTime: new Date(form.endTime),
        imageUrl: form.imageUrl || undefined, // optional
        description: form.description || undefined, // optional
        eventStatus: form.eventStatus as  EventStatus
      };
     await addMutation.mutateAsync(payload);
      setMessage('Event created successfully!');
      setForm(initialState);
      onNavigate('events');
    } catch (err: any) {
      setError('Failed to create event: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <Card title="Create New Event">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            ></textarea>
          </div>
          <div>
            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Event Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="eventStatus" className="block text-sm font-medium text-gray-700 mb-1">Event Status</label>
            <select
              id="eventStatus"
              name="eventStatus"
              value={form.eventStatus}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              {eventStatusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
            <input
              type="text"
              id="eventType"
              name="eventType"
              value={form.eventType}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="organizerName" className="block text-sm font-medium text-gray-700 mb-1">Organizer Name</label>
            <input
              type="text"
              id="organizerName"
              name="organizerName"
              value={form.organizerName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="organizerContact" className="block text-sm font-medium text-gray-700 mb-1">Organizer Contact</label>
            <input
              type="text"
              id="organizerContact"
              name="organizerContact"
              value={form.organizerContact}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          {message && <p className="text-green-600 text-sm text-center">{message}</p>}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-semibold text-white bg-blue-600 hover:bg-blue-700"
              disabled={addMutation.isPending}
            >
              {addMutation.isPending ? 'Creating...' : 'Create Event'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('events')}
              className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-base font-semibold text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateEventPage;
