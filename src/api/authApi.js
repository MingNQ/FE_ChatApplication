import { http, setAuthToken } from "./http.js";

export async function initiateSignIn(request) {
  const res = await http.post("/auth/sign-in/initiate", {
    contact: request.contact,
    password: request.password,
    rememberMe: request.rememberMe,
  });

  return res.data;
}

export async function verifySignIn(request) {
  const res = await http.post("/auth/sign-in/verify-otp", {
    contact: request.contact,
    verificationCode: request.verificationCode,
    rememberMe: request.rememberMe,
  });

  return res.data;
}

export async function resendSignInOtp(request) {
  const res = await http.post("/auth/sign-in/resend-otp", {
    contact: request.contact,
    verificationId: request.verificationId,
  });

  return res.data;
}

export async function inititateSignUp(request) {
  const res = await http.post("/auth/sign-up/initiate", {
    firstName: request.firstName,
    lastName: request.lastName,
    contact: request.contact,
    password: request.password,
    confirmPassword: request.confirmPassword,
  });

  return res.data;
}

export async function verifySignUp(request) {
  const res = await http.post("/auth/sign-up/verify-contact", {
    contact: request.contact,
    verificationCode: request.verificationCode,
  });

  return res.data;
}

export async function resendSignUpOtp(request) {
  const res = await http.post("/auth/sign-up/resend-otp", {
    contact: request.contact,
    verificationId: request.verificationId,
  });

  return res.data;
}

export async function setToken(token) {
  localStorage.setItem("token", token);
}

export async function setCurrentUser() {
    const token = localStorage.getItem("token");

    if (token == null || token == '') {
        return;
    }

    setAuthToken(token);
    
    const res = await http.get("/client/users/current-user");

    localStorage.setItem("current-user", res.data.result);
}
