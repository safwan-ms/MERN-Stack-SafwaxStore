import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/Auth/authSlice";
import { Link } from "react-router";
import { useProfileMutation } from "../../redux/api/usersApiSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (error) {
        toast.error("Email already exists", error);
      }
    }
  };

  return (
    <div className="container  mx-auto p-4 mt-[5rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="w-2/3 md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4"> Update Profile</h2>

          <form onSubmit={submitHandler}>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-white mb-1 md:mb-2">Username</label>
              <input
                type="text"
                placeholder="Enter name"
                value={username}
                className="form-input text-xs p-2 rounded-sm w-full border"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-white mb-1 md:mb-2 text-base">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                className="form-input p-2 text-xs rounded-sm w-full border"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-1 md:mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                className="form-input  p-2 text-xs rounded-sm w-full border"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-1 md:mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Enter confirm password"
                value={confirmPassword}
                className="form-input  p-2 text-xs rounded-sm w-full border"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-1 px-2 text-xs  hover:bg-pink-700 cursor-pointer md:py-2 md:px-4"
              >
                Update
              </button>

              <Link
                to="/user-orders"
                className="bg-pink-500 text-white py-1 px-2 text-xs hover:bg-pink-700 cursor-pointer md:py-2 md:px-4"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>

        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  );
};
export default Profile;
