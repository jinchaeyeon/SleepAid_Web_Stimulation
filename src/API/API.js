import axios from "axios";
import cookie from "./cookie";
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
    return null;
  }
};

const LoginInfo = async (path, params = {}) => {
  try {
    const response = await axios.get(api + path, {
      headers: {
        authorization: `Bearer ${params}`,
        Accept: "*/*",
      },
    });
    return response;
  } catch (e) {
    return [];
  }
};

const getFormRequest = async (path, defaultValue) => {
  try {
    const response = await axios.get(api + path, {
      headers: {
        authorization: `Bearer ${defaultValue.key}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    return [];
  }
};

const getJsonRequest = async (path, params, defaultValue) => {
  try {
    const response = await axios.get(api + path, {
      params: { params },
      headers: {
        authorization: `Bearer ${defaultValue.key}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    return [];
  }
};

const postFormReqest = async (path, params) => {
  try {
    const response = await axios.post(api + path, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    alert(e.response.data.detail);
    return null;
  }
};

const postJsonReqest = async (path, params, defaultValue) => {
  try {
    const response = await axios.post(api + path, params, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${defaultValue.key}`,
      },
      dataType: "json",
    });
    return response;
  } catch (e) {
    alert(e.response.data.detail);
    return null;
  }
};

const patchJsonReqest = async (path, body, defaultValue) => {
  try {
    const { data } = await axios.patch(api + path, body, {
      headers: {
        Authorization: `Bearer ${defaultValue.key}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (e) {
    return null;
  }
};

const deleteJsonReqest = async (path, defaultValue) => {
  try {
    const { data } = await axios.delete(api + path, {
      headers: {
        authorization: `Bearer ${defaultValue.key}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (e) {
    return null;
  }
};

const Api = {
  getUserData: async (token) => {
    return await LoginInfo(`/users/me`, token);
  },
  getAPI_AccountLogin_Syns: async (id, pw) => {
    let bodyFormData = new FormData();
    bodyFormData.append("username", id);
    bodyFormData.append("password", pw);
    return await Login(`/token`, bodyFormData);
  },
  getAPI_SignUp: async (ID, PW, Email, Name, boolean, date, License) => {
    const data = JSON.stringify({
      requestDateTime: date,
      password: PW,
      username: ID,
      email: Email,
      first_name: Name,
      last_name: "",
      is_staff: boolean,
    });
    return await postFormReqest(`/users/?license_key=${License}`, data);
  },
  getAPI_FindID: async (Email) => {
    const data = JSON.stringify({
      email: Email,
    });
    return await postFormReqest(`/findid/${Email}`, data);
  },
  getAPI_ChangePassword: async (pw, user, defaultValue) => {
    const data = JSON.stringify({
      requestUserCode: user,
      userCode: user,
      password: pw,
      encryption: 0,
    });
    return await postJsonReqest(`/Manager/UpdatePassword`, data, defaultValue);
  },
  getAPI_UserList: async (
    search,
    searchParameter,
    orderParameter,
    order,
    pageNumber,
    count,
    defaultValue
  ) => {
    const data = {
      search: search,
      searchParameter: searchParameter,
      orderParameter: orderParameter,
      order: order,
      pageNumber: pageNumber,
      count: count,
    };
    return await getJsonRequest(`/users/`, data, defaultValue);
  },
  getAPI_UserModify: async (UserID, Email, defaultValue) => {
    const data = JSON.stringify({
      id: UserID,
      email: Email,
    });
    return await patchJsonReqest(`/users/`, data, defaultValue);
  },
  getAPI_UserAdmin: async (UserID, button, defaultValue) => {
    const data = JSON.stringify({
      id: UserID,
      is_staff: button,
    });
    return await patchJsonReqest(`/users/`, data, defaultValue);
  },
  getAPI_UserDelete: async (UserID, defaultValue) => {
    return await deleteJsonReqest(`/users/${UserID}`, defaultValue);
  },  
  getAPI_LicenseList: async (
    search,
    searchParameter,
    orderParameter,
    order,
    pageNumber,
    count,
    defaultValue
  ) => {
    const data = {
      search: search,
      searchParameter: searchParameter,
      orderParameter: orderParameter,
      order: order,
      pageNumber: pageNumber,
      count: count,
    };
    return await getJsonRequest(`/licenses/`, data, defaultValue);
  },
  getAPI_ADDLicenseKey: async(defaultValue) => {
    return await getFormRequest(`/licenseKey/`, defaultValue);
  },
  getAPI_LicenseDelete: async (LicenseID, defaultValue) => {
    return await deleteJsonReqest(`/licenses/${LicenseID}`, defaultValue);
  },  
};

export default Api;
