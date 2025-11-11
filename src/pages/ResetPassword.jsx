import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [isError, setIsError] = useState(false);

  const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "rgba(229, 231, 235, 0.95)",
    fontFamily: '"Montserrat", sans-serif',
  };

  const cardStyle = {
    background: "white",
    width: "100%",
    maxWidth: "420px",
    borderRadius: "24px",
    padding: "28px",
    boxShadow:
      "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
  };

  const titleStyle = {
    color: "#3A5FCF",
    fontSize: "28px",
    fontWeight: "500",
    margin: "0 0 12px 0",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "16px 18px",
    backgroundColor: "#9FBFFA",
    border: "none",
    borderRadius: "22px",
    fontSize: "16px",
    marginBottom: "14px",
    outline: "none",
    WebkitTextFillColor: "#3A5FCF",
    color: "#3A5FCF",
    boxShadow:
      "inset 4px 4px 12px rgba(0,0,0,0.25), inset -4px -4px 12px rgba(255,255,255,0.6)",
  };

  const btnRowStyle = { display: "flex", gap: "12px", marginTop: "8px" };

  const primaryBtn = {
    backgroundColor: "#82ABF8",
    border: "none",
    borderRadius: "18px",
    padding: "12px 18px",
    cursor: "pointer",
    boxShadow:
      "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
    transition: "all 0.2s ease",
    flex: 1,
  };

  const secondaryBtn = {
    ...primaryBtn,
    backgroundColor: "#e5e7eb",
    color: "#1f2937",
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);
    setIsError(false);

    if (!email || !dob || !phone || !newPassword) {
      setIsError(true);
      setMsg("Please fill in all fields.");
      return;
    }
    if (!dobRegex.test(dob)) {
      setIsError(true);
      setMsg("Date of Birth must be in YYYY-MM-DD format.");
      return;
    }
    if (!phoneRegex.test(phone)) {
      setIsError(true);
      setMsg("Phone number must be in XXX-XXX-XXXX format.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        import.meta.env.VITE_BACKEND + "api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            dateOfBirth: dob,
            phoneNumber: phone,
            newPassword,
          }),
        }
      );

      const text = await res.text();
      let message = text;
      try {
        const parsed = JSON.parse(text);
        message = parsed.message || text;
      } catch {}

      if (!res.ok) {
        setIsError(true);
        setMsg(message || "Password reset failed.");
      } else {
        setIsError(false);
        setMsg(message || "Password reset successful.");
      }
    } catch {
      setIsError(true);
      setMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Date of Birth (YYYY-MM-DD)"
            style={inputStyle}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone (XXX-XXX-XXXX)"
            style={inputStyle}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            style={inputStyle}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />

          {msg && (
            <div
              style={{
                marginTop: "6px",
                marginBottom: "6px",
                color: isError ? "#b91c1c" : "#065f46",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {msg}
            </div>
          )}

          <div style={btnRowStyle}>
            <button
              type="button"
              style={secondaryBtn}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#d1d5db")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#e5e7eb")
              }
              onClick={() => navigate("/login")}
              disabled={loading}
            >
              Back to Login
            </button>

            <button
              type="submit"
              style={primaryBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#3b82f6";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#82ABF8";
                e.currentTarget.style.transform = "scale(1)";
              }}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Reset Password"}
            </button>
          </div>
        </form>

        {/* 📘 Added note for doctors/staff */}
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "13px",
            color: "#6B7280",
          }}
        >
          <strong>Note:</strong> This password reset option is available only
          for patients. Doctors and staff members should contact the
          administrator directly to change their password.
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
