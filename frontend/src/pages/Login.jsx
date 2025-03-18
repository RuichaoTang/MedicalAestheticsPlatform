import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthDispatch } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/users/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        console.log("data.message", data.message);
        dispatch({ type: "AUTH_ERROR" });
        setError(data.message);
        setLoading(false);

        return;
      }
      dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
      setLoading(false);
      navigate("/");
    } catch (error) {
      dispatch({ type: "AUTH_ERROR" });
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className=" px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            LOG IN
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Create an account for yourself - Customer or Clinic Owner.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-16 sm:mt-20 max-w-xl"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Email
              </label>
              <div className="mt-1.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Password
              </label>
              <div className="mt-1.5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="passowrd"
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div className="flex sm:col-span-2">
              <div className="text-sm/6 text-gray-600">
                Doesn't have an account?{" "}
                <Link to="/register" className="font-semibold text-indigo-600">
                  Create&nbsp;Account
                </Link>
                .
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              disabled={loading}
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? "LOGGING IN..." : "LOG IN"}
            </button>
          </div>
          {error && (
            <div className="mt-4 text-sm/6 text-red-600 text-center">
              {error}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
