import { API } from "../backend";

export const signup = (user) => {
  const formData = new FormData();

  formData.append("name", user.name);
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("phone", user.phone);
  formData.append("rollno", user.rollno);
  formData.append("gender", user.gender);
  formData.append("user_status", user.user_status);
  if (user.image !== null) formData.append("image", user.image);

  return fetch(`${API}user/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log("SUCCESS", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  const formData = new FormData();

  for (const name in user) {
    formData.append(name, user[name]);
  }

  return fetch(`${API}user/login/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log("Signin SUCCESS: ", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const getjwtemail = () => {
  if (!isAuthenticated()) {
    return;
  } else {
    return JSON.parse(localStorage.getItem("jwt")).user.email;
  }
};

export const getjwtid = () => {
  if (!isAuthenticated()) {
    return;
  } else {
    return JSON.parse(localStorage.getItem("jwt")).user.id;
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const signout = (next) => {
  const userId = isAuthenticated() && isAuthenticated().user.id;

  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");

    return fetch(`${API}user/logout/${userId}`, {
      method: "GET",
    })
      .then((response) => {
        console.log("Signout Success");
        next();
      })
      .catch((err) => console.log(err));
  }
  localStorage.removeItem("jwt");
};
