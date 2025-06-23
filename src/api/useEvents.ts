import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEvents,  createEvent, fetchEventDetails, updatedEvent, upsertEvent } from './events';

import type { CreateEventRequest, CreateEventResponse, EventDetails, GetEventsResponse } from './types/apiTypes';

export const EVENT_QUERY_KEY = 'events';

export const useEvents = (page: number, limit: number = 6) => {
  return useQuery<GetEventsResponse, Error>({
    queryKey: ['events', page, limit],
    queryFn: () => fetchEvents({ page, limit }),
    refetchInterval: 60000 * 4, // every 4 minutes
  });
};

export const useEvent = (eventId: string) => {
  return useQuery<EventDetails | undefined, Error>({
    queryKey: ['event', eventId],
    queryFn: () => fetchEventDetails(eventId),
    refetchInterval: 60000 * 4, // every 4 minutes
  });
}

export const useAddEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateEventResponse, Error, CreateEventRequest>({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateEventResponse, Error, { eventId: string; updatedData: EventDetails }>({
    mutationFn: async ({ eventId, updatedData }) => {
      const result = await updatedEvent(eventId, updatedData);
      if (!result) {
        throw new Error('Failed to update event');
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
export const useUpsertEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<EventDetails, Error, Partial<EventDetails>>({
    mutationFn: upsertEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};


