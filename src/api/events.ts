import type {
  CreateEventRequest,
  CreateEventResponse,
  EventDetails,
  GetEventDetailsResponse,
  GetEventsRequest,
  GetEventsResponse,
} from "./types/apiTypes";
import axios from "axios";

export const fetchEvents = async (
  params: GetEventsRequest = {}
): Promise<GetEventsResponse> => {
  const token = localStorage.getItem('token') || '';
  console.log('Fetching events with token:', token, 'and params:', params);

  try {
    const response = await axios.get('http://localhost:8000/api/event', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params, 
    });

    return response.data as GetEventsResponse;
  } catch (error) {
    console.error('Error fetching events:', error);
    return {
      events: [],
      page: params.page || 1,
      limit: params.limit || 6,
      total: 0,
      totalPages: 0,
      message: 'No events found',
    };
  }
};

// export const fetchEventById = async (id: string): Promise<Event | undefined> => {
//   await simulateDelay();
//   return JSON.parse(JSON.stringify(mockEvents.find(event => event.id === id)));
// };

export const createEvent = async (
  newEvent: CreateEventRequest
): Promise<CreateEventResponse> => {
  const response = await axios.post<CreateEventResponse>(
    "http://localhost:8000/api/event/createEvent",
    newEvent,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    }
  );
  if (!response.data || typeof response.data.id !== "number") {
    throw new Error("Failed to create event");
  }
  return response.data;
};

export const fetchEventDetails = async (eventId: string): Promise<EventDetails | undefined> => {
  console.log("Fetching event details for ID:", eventId);
  try {
    const res = await axios.get<GetEventDetailsResponse>(
      `http://localhost:8000/api/event/${eventId}/details`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }
    );

    return res.data.event; 
  } catch (err) {
    console.error("Error fetching event details:", err);
    return undefined;
  }
};

export const updatedEvent = async (
  eventId: string,
  updatedData: EventDetails
): Promise<CreateEventResponse | undefined> => {
  try {
    const res = await axios.put<CreateEventResponse>(
      `http://localhost:8000/api/event/${eventId}/update`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error updating event:", err);
    return undefined;
  }
}