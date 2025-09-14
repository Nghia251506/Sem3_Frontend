import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addUser } from "../redux/userSlice";
import { UserCreateDto } from "../types/User";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { Link } from "react-router-dom";

const Register = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState<UserCreateDto>({
        username: "",
        password_hash: "",
        employeeId: 0,
        authRoleId: 2,
        fullName: "",
        phone: "",
        email: ""
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password_hash !== confirmPassword) {
            message.error("Confirmation password does not match!");
            return;
        }

        setLoading(true);
        try {
            await dispatch(addUser(form)).unwrap();
            message.success("Registered successfully! Go back to login page...");
            setTimeout(() => navigate("/login"), 1000);
        } catch (err) {
            message.error("Registration failed. Please try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <img
                        src="https://static.wixstatic.com/media/087044_ff80b35095994e088a39204a11a185ed~mv2.jpg"
                        className="h-16 w-16 text-blue-600"
                    />
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                    Register
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={form.fullName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />

                        <input
                            type="password"
                            name="password_hash"
                            placeholder="Password"
                            value={form.password_hash}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            to="/"
                            className="text-sm text-blue-600 hover:text-blue-500"
                        >
                            ← Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
