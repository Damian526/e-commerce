import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useUser } from "../features/authentication/useUser";
import { useUpdateUser } from "../features/authentication/useUpdateUser";
import { FaPen } from "react-icons/fa";

function Account() {
  const { user } = useUser();
  const { updateUser, isLoading } = useUpdateUser();
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || "https://via.placeholder.com/150",
  );
  const fileInputRef = useRef(null);
  const [editMode, setEditMode] = useState({});
  const [userData, setUserData] = useState(user?.data?.user || {});

  useEffect(() => {
    setUserData(user?.data?.user || {});
  }, [user]);

  const { register, handleSubmit, formState, reset, setValue } = useForm({
    defaultValues: {
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      address: userData.address || "",
      phone: userData.phone || "",
    },
  });
  const { errors } = formState;

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const avatarURL = reader.result;
      setAvatar(avatarURL);
      localStorage.setItem("avatar", avatarURL);
    };
    reader.readAsDataURL(file);
  };

  const toggleEditMode = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    setValue(field, userData[field] || "");
  };

  const onSubmit = async (data) => {
    if (!data.firstName || !data.lastName || !data.address || !data.phone) {
      toast.error("All fields must be filled out");
      return;
    }

    try {
      const updatedUser = await updateUser(data);
      // Update the userData state with the updated user information
      setUserData((prevUserData) => ({
        ...prevUserData,
        ...updatedUser,
      }));
      reset();
      setEditMode({});
    } catch (error) {
      toast.error("Failed to update user information.");
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold m-4 text-gray-200">Account</h2>
      <div className="container mx-auto py-8 px-4 flex flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center lg:items-start">
          <label
            htmlFor="avatar-input"
            className="relative group cursor-pointer"
          >
            <img
              src={avatar}
              alt="User Avatar"
              className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full mb-4 shadow-lg border-4 border-gray-600 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-sm">Change Image</span>
            </div>
          </label>
          <input
            type="file"
            id="avatar-input"
            onChange={handleAvatarChange}
            className="hidden"
            ref={fileInputRef}
          />
        </div>

        {/* User Info Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg space-y-6"
        >
          <div className="flex items-center">
            <label className="w-32 font-semibold text-gray-300">
              Username:
            </label>
            <span className="text-gray-100">{userData.name}</span>
          </div>
          <div className="flex items-center">
            <label className="w-32 font-semibold text-gray-300">Email:</label>
            <span className="text-gray-100">{userData.email}</span>
          </div>
          <div className="flex items-center">
            <label className="w-32 font-semibold text-gray-300">
              First Name:
            </label>
            {editMode.firstName ? (
              <input
                type="text"
                className="border w-full border-gray-600 bg-gray-800 text-gray-100 py-2 px-4 rounded"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
            ) : (
              <span className="text-gray-100">{userData.firstName}</span>
            )}
            <FaPen
              className="ml-2 cursor-pointer text-gray-400 hover:text-gray-200"
              onClick={() => toggleEditMode("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="flex items-center">
            <label className="w-32 font-semibold text-gray-300">
              Last Name:
            </label>
            {editMode.lastName ? (
              <input
                type="text"
                className="border w-full border-gray-600 bg-gray-800 text-gray-100 py-2 px-4 rounded"
                {...register("lastName", {
                  required: "Last Name is required",
                })}
              />
            ) : (
              <span className="text-gray-100">{userData.lastName}</span>
            )}
            <FaPen
              className="ml-2 cursor-pointer text-gray-400 hover:text-gray-200"
              onClick={() => toggleEditMode("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
          <div className="flex items-center">
            <label className="w-32 font-semibold text-gray-300">Address:</label>
            {editMode.address ? (
              <input
                type="text"
                className="border w-full border-gray-600 bg-gray-800 text-gray-100 py-2 px-4 rounded"
                {...register("address", {
                  required: "Address is required",
                })}
              />
            ) : (
              <span className="text-gray-100">{userData.address}</span>
            )}
            <FaPen
              className="ml-2 cursor-pointer text-gray-400 hover:text-gray-200"
              onClick={() => toggleEditMode("address")}
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>
          <div className="flex items-center">
            <label className="w-32 font-semibold text-gray-300">
              Phone Number:
            </label>
            {editMode.phone ? (
              <input
                type="text"
                className="border w-full border-gray-600 bg-gray-800 text-gray-100 py-2 px-4 rounded"
                {...register("phone", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please provide a valid phone number",
                  },
                })}
              />
            ) : (
              <span className="text-gray-100">{userData.phone}</span>
            )}
            <FaPen
              className="ml-2 cursor-pointer text-gray-400 hover:text-gray-200"
              onClick={() => toggleEditMode("phone")}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 cursor-pointer transition"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Account;
