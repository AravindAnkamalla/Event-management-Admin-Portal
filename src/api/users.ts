import type { Event, User } from "../types";
import axios from "axios";
import type {
  CreateUserInput,
  CreateUserResponse,
  GetUserDetailsResponse,
  LoginResponse,
} from "./types/apiTypes";

export const fetchUsers = async (): Promise<User[]> => {
  let response: any;
  try {
    const token = localStorage.getItem("token") || "";
    response = await axios
      .get("http://localhost:8000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
  if (response !== undefined) {
    const users: User[] = response.users;
    console.log(users);
    return users;
  }
  return [];
};

export const fetchUserById = async (
  userId: string
): Promise<User | undefined> => {
  console.log("Fetching event details for ID:", userId);
  try {
    const res = await axios.get<GetUserDetailsResponse>(
      `http://localhost:8000/api/admin/users/${userId}/details`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }
    );

    return res.data.user;
  } catch (err) {
    console.error("Error fetching event details:", err);
    return undefined;
  }
};

export const deleteUser = async (userId: Number): Promise<boolean> => {
  return false;
};

// Function to update registered events for users after event deletions (called from events.ts)
export const removeEventFromUsers = (eventId: string) => {};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse | null> => {
  let response: any;
  try {
    response = await axios
      .post("http://localhost:8000/api/auth/login", { email, password })
      .then((res) => res.data);
  } catch (err) {
    console.error("Login failed:", err);
    response = undefined;
  }
  if (response !== undefined) {
    const loginResponse: LoginResponse = response;
    localStorage.setItem("token", loginResponse.token);
    console.log(loginResponse);
    return loginResponse;
  }

  return null;
};

export const resetPasswordEmail = async (email: string): Promise<boolean> => {
  return false;
};

export const upsertUser = async (
  data: CreateUserInput & { id?: number }
): Promise<CreateUserResponse> => {
  const userId = data.id ?? 0;
  const response = await axios.post<CreateUserResponse>(
    `http://localhost:8000/api/admin/users/upsert`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    }
  );
  return response.data;
};
