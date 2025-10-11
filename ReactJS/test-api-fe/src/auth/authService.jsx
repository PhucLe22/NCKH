const API_URL = "http://localhost:3001";

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
}

export async function register(username, email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, role: "user" }),
  });

  return res.json();
}

export async function sendOtp(email) {
  const res = await fetch(`${API_URL}/auth/forgotPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", 
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export const resetPassword = async (email, otp, newPassword, confirmNewPassword) => {
  const res = await fetch("http://localhost:3001/auth/updatePassword", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", 
    body: JSON.stringify({ email, otp, newPassword, confirmNewPassword }),
  });
  return res.json();
};