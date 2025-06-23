
import React from "react";
import { useUpsertUser, useUser } from "../api/useUsers";
import type { UserFormValues } from "../components/UseForm";
import UserForm from "../components/UseForm";

const EditUserPage: React.FC<{ userId: string; onNavigate: (page: string) => void }> = ({ userId, onNavigate }) => {
  const { data: user, isLoading, isError } = useUser(userId);
  const upsertMutation = useUpsertUser();

  const handleUpdate = async (data: UserFormValues) => {
    try {
      await upsertMutation.mutateAsync({ ...data, id: Number(userId) });
      onNavigate("users");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError || !user) return <p className="text-center text-red-500">Failed to load user</p>;

  return (
    <UserForm
      title={`Edit User: ${user.username}`}
      submitText="Update User"
      initialData={{ ...user, mobile: user.mobile ?? undefined }}
      onSubmit={handleUpdate}
      onCancel={() => onNavigate("users")}
      isSubmitting={upsertMutation.isPending}
    />
  );
};

export default EditUserPage;
