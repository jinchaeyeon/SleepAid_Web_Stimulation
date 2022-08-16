import axios from "axios";

const api = "http://localhost:8000";

const Login = async (path, params = {}) => {
  try {
    const response = await axios.post(api + path, params, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getRequest = async (path, params = {}) => {
  try {
    const response = await axios.get(api + path, {
      headers: {
        authorization: `Bearer ${params}`,
        Accept: "*/*",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const postFormReqest = async (path, body) => {
  try {
    const token = sessionStorage.getItem("user_token");
    const { data } = await axios.post(api + path, body, {
      headers: {
        authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

const postJsonReqest = async (path, body) => {
  try {
    const token = sessionStorage.getItem("user_token");
    if (token) {
      const { data } = await axios.post(api + path, body, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return data;
    } else {
      const { data } = await axios.post(api + path, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

const putJsonReqest = async (path, body) => {
  try {
    const token = sessionStorage.getItem("token");
    if (token) {
      const { data } = await axios.put(api + path, body, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return data;
    } else {
      const { data } = await axios.put(api + path, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteJsonReqest = async (path) => {
  try {
    const token = sessionStorage.getItem("user_token");
    if (token) {
      const { data } = await axios.delete(api + path, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return data;
    } else {
      const { data } = await axios.delete(api + path, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

const Api = {
  getUserData: async (token) => {
    return await getRequest(`/users/me`, token);
  },
  getAPI_AccountLogin_Syns: async (id, pw) => {
    let bodyFormData = new FormData();
    bodyFormData.append("username", id);
    bodyFormData.append("password", pw);
    return await Login(`/token`, bodyFormData);
  },
};

export default Api;
