import { API } from "../backend";

export const getMessage = () => {
  return fetch(`${API}message/`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getArticle = () => {
  return fetch(`${API}article/`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProject = () => {
  return fetch(`${API}project/`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getRecommendadionUsers = (urlMatcher) => {
  return fetch(`${API}recommendation/`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const articleDetail = (id) => {
  return fetch(`${API}article/${id}/`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const userDetail = (userUrl) => {
  return fetch(userUrl, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const messageDetail = (id) => {
  return fetch(`${API}message/${id}/`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const addArticle = (article) => {
  const formData = new FormData();

  formData.append("author", article.author);
  formData.append("title", article.title);
  formData.append("description", article.description);

  if (article.image !== "")
    formData.append("image", article.image, article.image.name);

  return fetch(`${API}article/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log("SUCCESS", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const addPreference = (preference) => {
  const formData = new FormData();
  formData.append("user", preference.user);
  formData.append("java", preference.java);
  formData.append("python", preference.python);
  formData.append("javascript", preference.javascript);

  return fetch(`${API}recommendation/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log("Success", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const addProject = (project) => {
  const formData = new FormData();
  formData.append("author", project.author);
  formData.append("title", project.title);
  formData.append("description", project.description);
  formData.append("github_url", project.github_url);
  if (project.image !== null)
    formData.append("image", project.image, project.image.name);

  return fetch(`${API}project/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const sendMessage = (message) => {
  const formData = new FormData();
  formData.append("sender", message.sender);
  formData.append("receiver", message.receiver);
  formData.append("description", message.description);
  if (message.image !== "")
    formData.append("image", message.image, message.image.name);

  return fetch(`${API}message/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
