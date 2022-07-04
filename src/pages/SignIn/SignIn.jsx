import "./signin.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner";
import { useMutation } from "@apollo/client";
import { userInfo } from "../../queries/queries";
import { USER_LOGIN } from "../../mutation/mutations";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const checkautoFill = watch("autoFill");
  const [loginInUser, { loading, error, data }] = useMutation(USER_LOGIN);
  const navigate = useNavigate();

  useEffect(() => {
    if (checkautoFill === "yes") {
      setValue("email", process.env.REACT_APP_EMAIL);
      setValue("password", process.env.REACT_APP_PASSWORD);
    } else {
      setValue("email", "");
      setValue("password", "");
    }
  }, [checkautoFill]);

  async function userLogin(submitData) {
    if (submitData.username) {
      await loginInUser({
        variables: {
          username: submitData.username,
          password: submitData.password,
        },
      });
    }
  }

  useEffect(() => {
    if (
      data !== undefined &&
      data !== null &&
      loading === false &&
      data.loginUser !== null
    ) {
      localStorage.setItem("login", true);
      localStorage.setItem("userId", data.loginUser._id);
      userInfo({
        userId: data.loginUser._id,
        username: data.loginUser.username,
        firstName: data.loginUser.firstName,
        lastName: data.loginUser.lastName,
        isUserLogin: true,
      });
      navigate("/");
    }
  }, [data, loading]);
  return (
    <div className="sign-in">
      <section className="sign-in__main">
        <div className="sign-in__main-container">
          <div className="sign-in__form">
            <div className="sign-in__main-header">
              <h2 className="sign-in__header-name">Login</h2>
            </div>
            <form
              className="sign-in__form-info"
              onSubmit={handleSubmit(userLogin)}
            >
              <div className="username-info">
                <label htmlFor="username" className="sign-in-label">
                  Enter your username
                </label>
                <input
                  placeholder="johnwick"
                  className="sign-in__input"
                  type="text"
                  id="login-username"
                  {...register("username", {
                    required: "This field is required",
                  })}
                />
                {errors.username && (
                  <span className="sign-in__error">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div className="password-info">
                <label htmlFor="password" className="sign-in-label">
                  Enter your password
                </label>

                <input
                  {...register("password", {
                    required: "This field is required",
                  })}
                  placeholder="**************"
                  className="sign-in__input"
                  type="password"
                  id="login-password"
                />
                {errors.password && (
                  <span className="sign-in__error">
                    {errors.password.message}
                  </span>
                )}
              </div>
              {/* {error && (
                <span className="sign-in__error txt-center">{error}</span>
              )} */}
              <div className="auto-fill__data">
                <input
                  type="checkbox"
                  name="auto-fill__input"
                  value="yes"
                  {...register("autoFill")}
                />
                <label htmlFor="auto-fill">Auto Fill</label>
              </div>

              <button type="submit" className="sign-in__button">
                Sign In
                {loading && (
                  <span className="spinner-indicator">
                    <LoadingSpinner
                      isDefaultCss={false}
                      color="white"
                      size={"12"}
                    />
                  </span>
                )}
              </button>
            </form>

            <div className="register__action">
              <span className="register__action-info">or</span>
              <Link to="/register" className="create-account-action">
                create an account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="left"></section>

      <section className="right"></section>
    </div>
  );
}
