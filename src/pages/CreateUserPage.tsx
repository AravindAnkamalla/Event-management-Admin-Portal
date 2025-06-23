// pages/CreateUserPage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import Card from '../components/Card';
import { useAddUser } from '../api/useUsers';
import type { CreateUserInput } from '../api/types/apiTypes';


const CreateUserPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserInput>();

  const addMutation = useAddUser();

  const onSubmit = async (data: CreateUserInput) => {
    try {
      await addMutation.mutateAsync(data);
      reset();
      onNavigate('users');
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <Card title="Create New User">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              {...register('username', { required: 'Username is required' })}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
            />
            {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
              })}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
            <input
              type="text"
              {...register('mobile', {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Mobile must be a 10-digit number',
                },
              })}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
            />
            {errors.mobile && <p className="text-red-600 text-sm">{errors.mobile.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              {...register('role', { required: 'Role is required' })}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
            {errors.role && <p className="text-red-600 text-sm">{errors.role.message}</p>}
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={addMutation.isPending}
              className="flex-1 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {addMutation.isPending ? 'Creating...' : 'Create User'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('users')}
              className="flex-1 py-2 px-4 border rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateUserPage;
