import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { LoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner";

import "./signup.css";
import { useMutation } from "@apollo/client";
import { userInfo } from "../../queries/queries";
import { CREATE_NEW_USER } from "../../mutation/mutations";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [createNewUser, { loading, data, error }] =
    useMutation(CREATE_NEW_USER);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      data !== undefined &&
      data !== null &&
      loading === false &&
      data.createNewUser !== null
    ) {
      localStorage.setItem("login", true);
      localStorage.setItem("userId", data.createNewUser._id);
      userInfo({
        userId: data.createNewUser._id,
        username: data.createNewUser.username,
        firstName: data.createNewUser.firstName,
        lastName: data.createNewUser.lastName,
        isUserLogin: true,
      });
      navigate("/");
    }
  }, [data, loading]);

  async function signup(data) {
    const { firstName, lastName, password, username } = data;
    if (data) {
      createNewUser({
        variables: {
          firstName,
          lastName,
          password,
          username,
        },
      });
    }
  }
  return (
    <>
      <div className="sign-up">
        <section className="sign-up__main">
          <div className="sign-up__main-container">
            <div className="sign-up__form">
              <div className="sign-up__main-header">
                <h2 className="sign-in__header-name">Create An Account</h2>
              </div>

              <form
                className="sign-up__form-actions"
                onSubmit={handleSubmit(signup)}
              >
                <div className="sign-up__name">
                  <div className="user__first-name">
                    <label className="user__name-label"> First name </label>
                    <input
                      {...register("firstName", {
                        required: true,
                      })}
                      type="text"
                      placeholder="john"
                      className="user__input-name"
                    />
                    {errors.firstName && (
                      <span className="sign-up__error">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>

                  <div className="user__last-name">
                    <label className="user__name-label"> Last name </label>
                    <input
                      {...register("lastName", {
                        required: true,
                      })}
                      type="text"
                      placeholder="wick"
                      className="user__input-name"
                    />
                    {errors.lastName && (
                      <span className="sign-up__error">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="user__username">
                  <label className="sign-up__label username-lb">Username</label>
                  <input
                    {...register("username", {
                      required: true,
                    })}
                    placeholder="johnfixyz"
                    type="text"
                    className="sign-up__input username-in"
                  />
                  {errors.username && (
                    <span className="sign-up__error">
                      {errors.username.message}
                    </span>
                  )}{" "}
                </div>

                <div className="user__password">
                  <label className="sign-up__label password-lb">Password</label>
                  <input
                    {...register("password", {
                      required: true,
                      pattern: {
                        value:
                          /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                        message:
                          "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character !",
                      },
                    })}
                    placeholder="********************"
                    type="password"
                    className="sign-up__input password-in"
                  />
                  {errors.password && (
                    <span className="sign-up__error">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="user__password">
                  <label className="sign-up__label cpassword-lb">
                    Confirm password
                  </label>
                  <input
                    {...register("confirm", {
                      required: true,
                      validate: {
                        passwordEqual: (value) =>
                          value === getValues("password") ||
                          "Password Dont Match",
                      },
                    })}
                    placeholder="********************"
                    type="password"
                    className="sign-up__input cpassword-in"
                  />
                  {errors.confirm && (
                    <span className="sign-up__error">
                      {errors.confirm.message}
                    </span>
                  )}
                </div>
                {loading === "rejected" && (
                  <span className="sign-up__error txt-center">{error}</span>
                )}
                <button type="submit" className="sign-up-button">
                  Sign Up
                  {loading === "pending" && (
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
              <div className="login__action">
                <span className="login__action-choice">or</span>

                <span className="login__route-info">
                  Already Register
                  <Link to="/login" className="login__route">
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </section>
        <div className="sign-up__right"></div>
        <div className="sign-up__left"></div>
      </div>
    </>
  );
}
