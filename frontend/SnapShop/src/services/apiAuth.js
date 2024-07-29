import axiosInstance from "./axiosInstance";

export const login = async ({ email, password }) => {
  console.log("response");
  const response = await axiosInstance.post("/users/login", {
    email,
    password,
  });
  return response.data;
};

export async function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axiosInstance.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching user data",
    );
  }
}
