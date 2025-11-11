import React from "react";

const ResetPassword = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: '"Montserrat", sans-serif',
    backgroundColor: "rgba(229, 231, 235, 0.95)",
  };

  const messageBoxStyle = {
    backgroundColor: "white",
    padding: "40px 60px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  };

  const headingStyle = {
    color: "#3A5FCF",
    fontSize: "28px",
    fontWeight: "500",
    marginBottom: "10px",
  };

  const subTextStyle = {
    color: "#6B7280",
    fontSize: "16px",
  };

  return (
    <div style={containerStyle}>
      <div style={messageBoxStyle}>
        <h1 style={headingStyle}>Reset Password Page</h1>
        <p style={subTextStyle}>To be implemented...</p>
      </div>
    </div>
  );
};

export default ResetPassword;
