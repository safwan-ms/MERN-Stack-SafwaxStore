import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader.jsx";
import { setCredentials } from "../../redux/features/Auth/authSlice.js";
import { useRegisterMutation } from "../../redux/api/usersApiSlice.js";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };
  return (
    <section className="px-[3rem] md:px-[5rem] lg:px-[10rem] text-xl xl:text-2xl">
      <div className="mt-[5rem] lg:mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
      </div>

      <form
        className="container sm:w-[10rem]lg:w-[30rem] xl:w-[40rem] "
        onSubmit={submitHandler}
      >
        <div className="my-[1rem]  flex flex-col">
          <label htmlFor="email" className="text-sm xl:text-lg">
            Username
          </label>

          <input
            type="text"
            id="name"
            className="mt-3 border rounded-md w-full p-[2px] text-sm xl:text-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="my-[1rem]  flex flex-col">
          <label htmlFor="email" className="text-sm xl:text-lg">
            Email Address
          </label>

          <input
            type="email"
            id="email"
            className="mt-3 border rounded-md w-full p-[2px] text-sm xl:text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="my-[1rem] flex flex-col">
          <label htmlFor="password" className="text-sm xl:text-lg">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder=""
            className="mt-3 border rounded-md w-full p-[2px] text-sm xl:text-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Confirm Password */}
        <div className="my-[1rem] flex flex-col">
          <label htmlFor="password" className="text-sm xl:text-lg">
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            placeholder=""
            className="mt-3 border rounded-md w-full p-[2px] text-sm xl:text-lg"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="bg-pink-500 text-sm xl:text-lg text-white px-3 py-1 rounded cursor-pointer my-[1rem]"
        >
          {isLoading ? "Registering" : "Register"}
        </button>

        {isLoading && <Loader />}
      </form>
      <div>
        <p className="text-sm xl:text-lg">
          Already have an account Customer ?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/register"}
            className="text-pink-500 hover:underline"
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};
export default Register;
