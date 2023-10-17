import axios from "axios";
const backend_URL = import.meta.env.VITE_Backend_URL;

export const register = async (name, mobile, email, password) => {
  try {
    console.log(backend_URL);
    const reqUrl = "http/register";
    const payload = {
      name: name,
      mobile: mobile,
      email: email,
      password: password,
    };
    const responce = await axios.post(
      "http://localhost:3000/register",
      payload
    );
    return responce.data;
  } catch (error) {
    console.log(error);
  }
};
