import { createContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Inputs/Input";
import {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import useAuth from "../hooks/useAuth";

enum Varient {
  SIGN_UP,
  LOG_IN,
}

export type Inputs = {
  email: string;
  password: string;
  name: string;
};

interface AuthContextType {
  register: UseFormRegister<Inputs> | null;
  errors: FieldErrors<Inputs>;
}

export const AuthFormContext = createContext<AuthContextType>({
  register: null,
  errors: {},
});

export default function LogInCard() {
  const [varient, setVarient] = useState(Varient.LOG_IN);
  const [authError, setAuthError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();

  const { login, singup } = useAuth();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async ({ password, name, email }) => {
    try {
      if (varient === Varient.SIGN_UP) {
        await singup({
          email,
          password,
          username: name,
        });
      } else {
        await login({
          email,
          password,
        });
      }

      setAuthError("");
      navigate("/browse");
    } catch (error: any) {
      setAuthError(error.response.data.errors[0].msg);
    }
  };

  const handleAuth = () => {
    if (varient === Varient.LOG_IN) setVarient(Varient.SIGN_UP);
    else setVarient(Varient.LOG_IN);
  };

  return (
    <div className="LogIn-Page">
      <div className="logo d-flex">
        <Link to="/" className="d-flex mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="200"
            height="200"
            viewBox="0 0 48 48"
          >
            <path
              fill="#F44336"
              d="M5 18c.7 0 1.3 0 2 0 0 4.1 0 8.1 0 12.2-.8.1-1.6.2-2.3.3-1-2.5-2.7-6.8-2.7-6.8S2 28 2 30.8c.4 0-.2 0-2 .3 0-4.3 0-8.7 0-13 .8 0 2 0 2 0l3 7.3C5 25.4 5 20.8 5 18zM14.7 20c0-.6 0-1.4 0-2-1.9 0-3.8 0-5.7 0 0 4 0 8 0 12 1.9-.2 3.8-.4 5.7-.6 0-.6 0-1.4 0-2-1.2.1-2.4.1-3.7.4 0-1.1 0-1.7 0-2.8.9 0 2.1 0 3 0 0-.6 0-1.4 0-2-.9 0-2.1 0-3 0 0-1.1 0-1.9 0-3C11.6 20.1 14.2 20.1 14.7 20zM16 20c.1 0 1.9 0 2 0 0 3.2 0 6 0 9.2.7 0 1.3 0 2-.1 0-3.2 0-5.9 0-9.1.7 0 1.3 0 2 0 0-.6 0-1.4 0-2-2.1 0-3.9 0-6 0C16 18.6 16 19.4 16 20zM28.6 18c-1.9 0-3.7 0-5.6 0 0 3.8 0 7.2 0 11 .2 0 .4 0 .6 0 .4 0 .9 0 1.4 0 0-1.6 0-2.4 0-4 .1 0 2.4 0 2.7 0 0-.6 0-1.4 0-2-.3 0-2.6 0-2.7 0 0-1 0-2 0-3 .2 0 3.1 0 3.6 0C28.6 19.5 28.6 18.6 28.6 18zM32 27.5c0-3.3 0-6.2 0-9.5-.7 0-1.3 0-2 0 0 3.8 0 7.4 0 11.2 1.8.1 3.6.2 5.4.4 0-.6 0-1.3 0-1.9C34.3 27.6 33.1 27.5 32 27.5zM37 29.7c.7.1 1.3.1 2 .2 0-4 0-7.9 0-11.9-.7 0-1.3 0-2 0C37 22 37 25.8 37 29.7zM45.4 24.2c.9-2 1.7-4 2.6-6.1-.7 0-1.5 0-2.2 0-.5 1.3-.9 2.2-1.4 3.4-.5-1.3-.8-2.2-1.3-3.4-.7 0-1.5 0-2.2 0 .8 2 1.5 4 2.4 6.1-.9 2-1.7 4-2.6 6 .7.1 1.4.2 2.1.3.5-1.3 1-2.2 1.5-3.5.5 1.4 1 2.4 1.5 3.8.7.1 1.6.2 2.3.3C47.1 28.7 46.2 26.3 45.4 24.2z"
            ></path>
          </svg>
        </Link>
      </div>
      <div className="SingUp-card d-flex flex-column">
        <div className="SingUp-card-container d-flex flex-column gap-3 p-5 md:max-xl:flex">
          <h1 className="text-white text-2xl fs-1">
            {varient === Varient.SIGN_UP ? "Sing Up " : "Long In"}
          </h1>
          <AuthFormContext.Provider
            value={{
              register,
              errors,
            }}
          >
            <form
              className="inputs-register d-flex flex-column gap-3 mt-5 mb-0"
              onSubmit={handleSubmit(onSubmit)}
            >
              {varient === Varient.SIGN_UP && (
                <Input id="username" label="Username" type="text" name="name" />
              )}
              <Input
                id="email"
                label="Email address"
                type="email"
                name="email"
              />
              <Input
                id="password"
                label="Password"
                type="password"
                name="password"
                validate={
                  varient === Varient.SIGN_UP
                    ? () => {
                        const password = getValues("password");

                        if (password.length < 8) {
                          return "the password must be greater than 8 characters!";
                        }
                        if (!/[A-Z]/.test(password)) {
                          return "the password must have at least 1 uppercase characters!";
                        }
                        if (!/[a-z]/.test(password)) {
                          return "the password must have at least 1 lowercase characters!";
                        }
                        if (!/\d/.test(password)) {
                          return "the password must have a number!";
                        }

                        return true;
                      }
                    : undefined
                }
              />

              <input
                type="submit"
                className="bg-red-400 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700"
              />

              {authError && <p className="text-red-500">{authError}</p>}
            </form>
          </AuthFormContext.Provider>
          <div className="d-flex fs-5 mt-3">
            {varient === Varient.SIGN_UP ? (
              <p
                className="underline decoration-3"
                style={{ color: "#6c6c6c" }}
              >
                <button className="text-white d-inline" onClick={handleAuth}>
                  Already have account?
                </button>
              </p>
            ) : (
              <p
                className="underline decoration-3"
                style={{ color: "#6c6c6c" }}
              >
                <button className="text-white d-inline" onClick={handleAuth}>
                  First time in Netflix?
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
