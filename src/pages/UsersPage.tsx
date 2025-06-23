import React from "react";
import Card from "../components/Card";
import { useUsers, useDeleteUser } from "../api/useUsers";
import InvitationStatusIcon from "../components/InvitationStatusIcon";


const UsersPage: React.FC<{ onNavigate: (page: string, params?: { userId?: string }) => void }> = ({
  onNavigate,
}) => {
  const { data: users, isLoading: usersLoading, isError: usersError } = useUsers();
  const deleteMutation = useDeleteUser();

  const handleDelete = async (userId: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This will also remove them from all registered events."
      )
    ) {
      try {
        await deleteMutation.mutateAsync(userId);
        alert("User deleted successfully!");
      } catch (error) {
        alert("Failed to delete user: " + error);
      }
    }
  };

  if (usersLoading) return <p className="text-center text-gray-700">Loading users...</p>;
  if (usersError) return <p className="text-center text-red-600">Error loading users data.</p>;

  return (
    <div className="p-6">
      <Card title="All Users">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => onNavigate("create-user")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-200"
          >
            Create New User
          </button>
        </div>

        {users?.length === 0 ? (
          <p className="text-gray-600">No users found in the system.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Invitation</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users?.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                    <td className="py-3 px-4 whitespace-nowrap text-gray-800">{user.username}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-gray-800">{user.email}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-gray-800 capitalize">{user.role}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <InvitationStatusIcon status={user.invitation} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => onNavigate("edit-user", { userId: String(user.id) })}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-1 px-3 rounded-full shadow-sm transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1 px-3 rounded-full shadow-sm transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default UsersPage;
