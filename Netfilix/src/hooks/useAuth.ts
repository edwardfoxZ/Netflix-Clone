import axios from "axios";
import Cookie from "universal-cookie";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../features/userSlice";

const cookie = new Cookie();

const useAuth = () => {
  const dispatch = useDispatch();
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    });
    const { token, user } = response.data;
    cookie.set("section_token", token);
    dispatch(
      setUser({
        email: user.email,
        username: user.username,
      })
    );

    return response.data;
  };

  const singup = async ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    const response = await axios.post("http://localhost:8080/auth/singup", {
      email,
      password,
      username,
    });
    const { token, user } = response.data;
    cookie.set("section_token", token);

    dispatch(
      setUser({
        email: user.email,
        username: user.username,
      })
    );

    return response.data;
  };

  const fetchUser = async () => {
    const section_token = cookie.get("section_token");
    try {
      const response = await axios.get("http://localhost:8080/auth/me", {
        headers: {
          ...(section_token
            ? { Authorization: `Bearer ${section_token}` }
            : null),
        },
      });
      const user = response.data;

      if (!user) {
        return dispatch(clearUser());
      }

      dispatch(
        setUser({
          email: user.email,
          username: user.username,
        })
      );
    } catch (error) {
      return dispatch(clearUser());
    }
  };

  return { login, singup, fetchUser };
};

export default useAuth;

// cdsf@l590982A
