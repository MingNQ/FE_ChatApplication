import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { PasswordInput } from "../../../components/PasswordInput";
import { OtpInput } from "../../../components/OtpInput";
import {
  inititateSignUp,
  verifySignUp,
  resendSignUpOtp,
  setToken,
} from "../../../api/authApi";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";

export function SignUp() {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(0);
  const navigate = useNavigate();

  const { login } = useAuth();
  const { toast } = useToast();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match. Please try again!");
      return;
    }

    try {
      const data = await inititateSignUp({
        firstName: form.firstName,
        lastName: form.lastName,
        contact: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      if (data.success == true) {
        setVerificationId(data.result.verificationId);
        toast.success(data.result.message);
        setShowOtp(true);
      } else {
        setError(data.result.message);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const data = await verifySignUp({
        contact: form.email,
        verificationCode: otp,
      });

      if (data.success == true) {
        toast.success(data.result.message);
        await login(data.result.accessToken, data.result.refreshToken);

        navigate("/", { replace: true });
      } else {
        setError(data.result.message);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const handleResendOtp = async () => {
    try {
      const data = await resendSignUpOtp({
        contact: form.email,
        verificationId: verificationId,
      });

      if (data.success == true) {
        toast.success(data.result.message);
      } else {
        setError(data.result.message);
      }
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      <title>Sign Up</title>

      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {!showOtp ? (
            <>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="flex gap-2">
                  <input
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    className="w-1/2 border px-3 py-2 rounded"
                  />
                  <input
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                    className="w-1/2 border px-3 py-2 rounded"
                  />
                </div>

                <input
                  name="email"
                  placeholder="Email or Phone"
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />

                <PasswordInput
                  key={0}
                  placeholder="Password"
                  value={form.password || ""}
                  onChange={handleChange}
                  name="password"
                />

                <PasswordInput
                  key={1}
                  placeholder="Confirm Password"
                  value={form.confirmPassword || ""}
                  onChange={handleChange}
                  name="confirmPassword"
                />

                <button className="w-full bg-blue-600 text-white py-2 rounded">
                  Sign Up
                </button>
              </form>

              <p className="text-sm text-center mt-4">
                Have account yet?{" "}
                <Link to="/sign-in" className="text-blue-600">
                  Sign In
                </Link>
              </p>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <OtpInput value={otp} onChange={setOtp} />
                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-green-600 text-white py-2 rounded"
                >
                  Verify OTP
                </button>
              </div>

              <button
                onClick={handleResendOtp}
                className="text-sm text-center mt-4 text-blue-600"
              >
                Resend OTP
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
