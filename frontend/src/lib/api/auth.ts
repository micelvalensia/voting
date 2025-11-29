import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = async (username: string, password: string) => {
  try {
    const res = await axios.post(
      `${apiUrl}/login`,
      { username, password },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const register = async (
  username: string,
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await axios.post(
      `${apiUrl}/register`,
      { username, name, email, password },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
