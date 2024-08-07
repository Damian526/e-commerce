import { useState, useRef } from "react";

function Account() {
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || "https://via.placeholder.com/150"
  );
  const fileInputRef = useRef(null);

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

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Account</h2>
      <div className="flex items-center ">
        <label htmlFor="avatar-input" className="relative group cursor-pointer">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mb-4"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-sm">Change Account Image</span>
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
    </div>
  );
}

export default Account;
