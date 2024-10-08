import { GiArchiveRegister } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignup } from "../features/authentication/useSignup";
import { toast } from "react-hot-toast";

function Signup() {
  const { mutate: signup, isLoading } = useSignup();
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    const {
      name,
      email,
      password,
      passwordConfirm,
      firstName,
      lastName,
      address,
      phone,
    } = data;

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    signup(
      {
        name,
        email,
        password,
        passwordConfirm,
        firstName,
        lastName,
        address,
        phone,
      },
      {
        onSettled: () => reset(),
      },
    );
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center font-karla bg-gray-100">
      <div
        className="relative border shadow rounded p-8 max-w-md w-full bg-slate-800 text-white"
        data-test="signup-container"
      >
        <div className="flex flex-col items-center mb-4">
          <Link
            to="/"
            className="text-4xl font-bold dark:text-white mb-4"
            data-test="main-logo"
            aria-label="SnapShop Home"
          >
            SnapShop
          </Link>
          <div className="flex mb-2 space-x-2 justify-center items-center">
            <GiArchiveRegister />
            <h3 className="font-bold text-center text-2xl">Register</h3>
            <GiArchiveRegister />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3"
        >
          <div className="relative">
            <input
              data-test="input-name"
              type="text"
              placeholder="Your name here..."
              className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
              {...register("name", { required: "This field is required" })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="relative">
            <input
              data-test="input-firstName"
              type="text"
              placeholder="Your first name here..."
              className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
              {...register("firstName", { required: "This field is required" })}
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="relative">
            <input
              data-test="input-lastName"
              type="text"
              placeholder="Your last name here..."
              className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
              {...register("lastName", { required: "This field is required" })}
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
          <div className="relative">
            <input
              data-test="input-address"
              type="text"
              placeholder="Your address here..."
              className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
              {...register("address", { required: "This field is required" })}
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>
          <div className="relative">
            <input
              data-test="input-phone"
              type="text"
              placeholder="Your phone number here..."
              className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
              {...register("phone", {
                required: "This field is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please provide a valid phone number",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="relative">
            <input
              data-test="input-email"
              type="email"
              placeholder="Your email here..."
              className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="relative">
            <input
              data-test="input-password"
              type="password"
              placeholder="Your password here..."
              className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="relative">
            <input
              data-test="input-passwordConfirm"
              type="password"
              placeholder="Confirm your password..."
              className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
              {...register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords need to match",
              })}
            />
            {errors.passwordConfirm && (
              <p className="text-red-500">{errors.passwordConfirm.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700 cursor-pointer"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-1">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
