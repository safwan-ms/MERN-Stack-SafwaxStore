import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice.js";
import { setCredentials } from "../../redux/features/Auth/authSlice.js";
import { toast } from "react-toastify";
import Loader from "../../components/Loader.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div>
      <section className="px-[2.8rem] md:px-[5rem] lg:px-[10rem] text-xl xl:text-2xl`">
        <div className="mt-[5rem] lg:mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

          {/* Email */}
          <form
            onSubmit={submitHandler}
            className="container sm:w-[10rem] lg:w-[30rem] xl:w-[40rem]"
          >
            <div className="my-[12px] md:my-[1rem] flex flex-col">
              <label
                htmlFor="email"
                className=" text-sm md:text-base xl:text-lg"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-3 border rounded-md w-full p-[2px] text-base xl:text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="my-[12px] md:my-[1rem] flex flex-col">
              <label
                htmlFor="email"
                className="text-sm md:text-base xl:text-lg"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder=""
                className="mt-3 border rounded-md w-full p-[2px] text-base xl:text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-base xl:text-lg text-white px-3 py-1 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Signing In" : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div>
            <p className="text-base xl:text-lg">
              New Customer ?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Login;
