
import React from "react";
import { useUpsertUser } from "../api/useUsers";
import type { UserFormValues } from "../components/UseForm";
import UserForm from "../components/UseForm";

const CreateUserPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const upsertMutation = useUpsertUser();

  const handleCreate = async (data: UserFormValues) => {
    try {
      await upsertMutation.mutateAsync(data);
      onNavigate("users");
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  return (
    <UserForm
      title="Create New User"
      submitText="Create User"
      initialData={undefined}
      onSubmit={handleCreate}
      onCancel={() => onNavigate("users")}
      isSubmitting={upsertMutation.isPending}
    />
  );
};

export default CreateUserPage;
