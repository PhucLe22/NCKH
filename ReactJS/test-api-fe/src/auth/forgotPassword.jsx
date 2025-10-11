import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { sendOtp, resetPassword } from "./authService";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await sendOtp(email);
      if (res.message) {
        setMessage("OTP has been sent to your email!");
        setMessageType("success");
        setStep(2);
        setCountdown(60); 
      } else {
        setMessage("Failed to send OTP!");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Unable to connect to the server!");
      setMessageType("error");
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const res = await sendOtp(email);
      if (res.message) {
        setMessage("New OTP has been sent!");
        setMessageType("success");
        setCountdown(60); 
      } else {
        setMessage("Failed to resend OTP!");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Server connection failed while resending OTP!");
      setMessageType("error");
    }
    setIsResending(false);
  };

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && step === 2) {
      setMessage("⌛ OTP has expired! You can request a new one.");
      setMessageType("warning");
    }
    return () => clearTimeout(timer);
  }, [countdown, step]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Password confirmation does not match!");
      setMessageType("error");
      return;
    }

    try {
      const res = await resetPassword(email, otp, newPassword, confirmPassword);

      if (res.message?.includes("success")) {
        setMessage("Password updated successfully! Redirecting to Login...");
        setMessageType("success");
        setTimeout(() => navigate("/auth/login"), 1500);
      } else {
        setMessage(res.message || "Invalid OTP or password!");
        setMessageType("error");
      }
    } catch (err) {
      setMessage(" Server error while updating password!");
      setMessageType("error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>

        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <input
              className="auth-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="auth-button" type="submit">
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <input
              className="auth-input"
              type="text"
              placeholder="Enter OTP code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <div className="password-input-group">
              <input
                className="auth-input"
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <div className="password-input-group">
              <input
                className="auth-input"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>

            <button
              className="auth-button"
              type="submit"
              disabled={countdown === 0 ? false : false}
            >
              Update Password
            </button>

            {countdown > 0 ? (
              <p className="auth-countdown">
                ⏳ <span style={{ color: "#f39c12" }}>OTP expires in</span>{" "}
                <b style={{ color: "#e74c3c" }}>{countdown}</b>{" "}
                <span style={{ color: "#f39c12" }}>seconds</span>
              </p>
            ) : (
              <button
                type="button"
                className="resend-button"
                onClick={handleResendOtp}
                disabled={isResending}
              >
                {isResending ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </form>
        )}

        {message && (
          <p
            className={`auth-message ${
              messageType === "success"
                ? "msg-success"
                : messageType === "error"
                ? "msg-error"
                : "msg-warning"
            }`}
          >
            {message}
          </p>
        )}

        <p className="auth-link">
          <Link to="/auth/login">⬅ Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;