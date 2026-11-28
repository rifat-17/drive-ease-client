


import { getTokenFromServer } from "./getTokenFromServer";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const serverApi = async (endpoint: string) => {
  const token = await getTokenFromServer();

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data.");
  }

  return response.json();
};