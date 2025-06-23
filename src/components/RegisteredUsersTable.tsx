import React from 'react';
import { getRegistrationStatusBadge, formatDateTime } from '../utils';
import type { RegisteredUser } from '../api/types/apiTypes';
;

const RegisteredUsersTable: React.FC<{ users: RegisteredUser[] }> = ({ users }) => {
  if (!users?.length) return <p className="text-gray-600">No users registered yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{user.username}</div>
                <div className="text-sm text-gray-500">ID: {user.id}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>{user.email}</div>
                <div className="text-sm text-gray-500">{user.mobile}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {getRegistrationStatusBadge(user.registrationStatus)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDateTime(user.registrationDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredUsersTable;
