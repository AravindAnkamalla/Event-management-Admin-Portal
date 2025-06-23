import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import Card from "../components/Card";
import { useUser, useUpdateUser } from "../api/useUsers";
import type { Role, User } from "../types";

type EditUserFormInputs = {
  username: string;
  email: string;
  role: Role;
  mobile?: string;
};

const EditUserPage: React.FC<{
  userId: string;
  onNavigate: (page: string) => void;
}> = ({ userId, onNavigate }) => {
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useUser(userId);
  const updateMutation = useUpdateUser();
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditUserFormInputs>();
  console.log("EditUserPage rendered with user:", user);
  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("role", user.role);
      setValue("mobile", user.mobile || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data: EditUserFormInputs) => {
    setServerError("");
    setServerMessage("");

    if (!user) {
      setServerError("User data is missing.");
      return;
    }

    const updatedUser: User = {
      ...user,
      username: data.username,
      email: data.email,
      role: data.role,
      mobile: data.mobile || null, // Allow mobile to be optional

    };

    try {
      await updateMutation.mutateAsync(updatedUser);
      setServerMessage("User updated successfully!");
      onNavigate("users");
    } catch (err: any) {
      console.error(err);
      setServerError("Failed to update user: " + err.message);
    }
  };

  if (userLoading)
    return (
      <p className="text-center text-gray-700">Loading user for editing...</p>
    );
  if (userError || !user)
    return <p className="text-center text-red-600">Error loading user.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card title={`Edit User: ${user.username}`}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              id="username"
              type="text"
            />
            {errors.username && (
              <p className="text-red-600 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              id="email"
              type="email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="mobile"
            >
              Mobile
            </label>
            <input
              {...register("mobile", {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              id="mobile"
              type="tel"
            />
            {errors.mobile && (
              <p className="text-red-600 text-sm mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="role"
            >
              Role
            </label>
            <select
              {...register("role", { required: "Role is required" })}
              id="role"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {serverMessage && (
            <p className="text-green-600 text-sm text-center">
              {serverMessage}
            </p>
          )}
          {serverError && (
            <p className="text-red-600 text-sm text-center">{serverError}</p>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition transform hover:scale-105"
            >
              {updateMutation.isPending ? "Updating..." : "Update User"}
            </button>
            <button
              type="button"
              onClick={() => onNavigate("users")}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md bg-white hover:bg-gray-50 transition transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditUserPage;
