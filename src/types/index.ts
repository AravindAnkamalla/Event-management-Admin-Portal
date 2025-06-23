// Define types for better type safety with TypeScript
export type Role = 'ADMIN' | 'USER';
export type InvitationStatus = 'READY' | 'SENT' ;
export enum EventStatus {
  ACTIVE='ACTIVE',
  COMPLETED='COMPLETED',
  CANCELLED='CANCELLED',
}
export type User = {
    id: number;
    username: string;
    email: string;
    mobile: string | null;
    role: Role;
    invitation: InvitationStatus;
    createdBy: Role;
    createdAt: Date;
    updatedBy: Role;
    updatedAt: Date;
    isFirstLogin: boolean;
  };

export interface Event {
  id: number;
  name: string;
  description?: string;
  eventDate: Date;
  startTime: Date;
  endTime: Date;
  address: string;
  eventType: string;
  eventStatus: EventStatus;
  organizerName: string;
  organizerContact: string;
  imageUrl?: string;
  
}
