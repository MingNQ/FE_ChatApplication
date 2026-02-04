import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { OtpInput } from "../../../components/OtpInput";
import { PasswordInput } from "../../../components/PasswordInput";
import {
  initiateSignIn,
  verifySignIn,
  resendSignInOtp,
} from "../../../api/authApi";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import { authStorage } from "../../../stores/authStore";
import { useTranslation } from "react-i18next";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [error, setError] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const [verificationId, setVerificationId] = useState(0);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await initiateSignIn({ contact: email, password: password });
      if (data.success == true) {
        setVerificationId(data.result.verificationId);
        toast.success(data.result.message);
        setShowOtp(true);
      } else {
        toast.error(data.result.message);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setIsLoading(true);

    try {
      const data = await verifySignIn({
        contact: email,
        verificationCode: otp,
        rememberMe: remember,
      });

      if (data.success == true) {
        toast.success(data.result.message);
        await login(data.result.accessToken, data.result.refreshToken);
        authStorage.setTokens(
          data.result.accessToken,
          data.result.refreshToken,
          remember,
        );

        navigate("/", { replace: true });
      } else {
        setError(data.result.message);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const data = await resendSignInOtp({
        contact: email,
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
      <title>Sign In</title>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-center mb-6">
            {t("auth.signIn")}
          </h2>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {!showOtp ? (
            <>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  placeholder={t("auth.emailOrPhone")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />

                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("auth.password")}
                />

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  {t("auth.rememberMe")}
                </label>

                {isLoading && (
                  <div className="flex justify-center">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                <button
                  disabled={isLoading}
                  className={`w-full py-2 rounded text-white 
                    ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600"}`}
                >
                  {isLoading ? t("common.loading") : t("auth.signIn")}
                </button>
              </form>

              <p className="text-sm text-center mt-4">
                {t("auth.noAccountYet")}{" "}
                <Link to="/sign-up" className="text-blue-600">
                  {t("auth.signUp")}
                </Link>
              </p>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <OtpInput value={otp} onChange={setOtp} />

                {isLoading && (
                  <div className="flex justify-center">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                <button
                  disabled={isLoading}
                  onClick={handleVerifyOtp}
                  className={`w-full text-white py-2 rounded
                    ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600"}`}
                >
                  {isLoading ? t("common.loading") : t("auth.verifyOtp")}
                </button>
              </div>

              <button
                onClick={handleResendOtp}
                className="text-sm text-center mt-4 text-blue-600"
              >
                {t("auth.resendOtp")}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
