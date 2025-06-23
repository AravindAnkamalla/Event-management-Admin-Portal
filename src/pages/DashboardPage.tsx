import React from 'react';
import { useEvents } from '../api/useEvents';
import { useUsers } from '../api/useUsers';
import Card from '../components/Card';


const DashboardPage: React.FC = () => {
  const { data: eventRespons, isLoading: eventsLoading, isError: eventsError } = useEvents();
  const { data: usersResponse, isLoading: usersLoading, isError: usersError } = useUsers();

  if (eventsLoading || usersLoading) return <p className="text-center text-gray-700">Loading dashboard data...</p>;
  if (eventsError || usersError) return <p className="text-center text-red-600">Error loading data.</p>;

  const totalEvents = eventRespons?.events?.length || 0;
  const totalUsers = usersResponse?.length || 0;
  const upcomingEvents = eventRespons?.events?.filter(event => new Date(event.eventDate) > new Date()).length || 0;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card title="Total Events">
        <p className="text-5xl font-extrabold text-blue-600">{totalEvents}</p>
      </Card>
      <Card title="Total Users">
        <p className="text-5xl font-extrabold text-green-600">{totalUsers}</p>
      </Card>
      <Card title="Upcoming Events">
        <p className="text-5xl font-extrabold text-purple-600">{upcomingEvents}</p>
      </Card>
    </div>
  );
};

export default DashboardPage;
