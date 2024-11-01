import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "https://tripplanner-1.onrender.com/api/auth/login",
        formData
      );
      if (res.data?.token && res.data?.name) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("name", res.data.name);

        alert(res.data.message);
        setLoading(false);
        navigate("/");
      } else {
        throw new Error("Authentication failed. No token received.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Error during login");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
export default Login;
