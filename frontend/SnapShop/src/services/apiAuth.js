import axiosInstance from "./axiosInstance";

export const login = async ({ email, password }) => {
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
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching user data",
    );
  }
}

export const signup = async ({
  name,
  email,
  password,
  passwordConfirm,
  firstName,
  lastName,
  address,
  phone,
}) => {
  try {
    const response = await axiosInstance.post("/users/signup", {
      name,
      email,
      password,
      passwordConfirm,
      firstName,
      lastName,
      address,
      phone,
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};
