import { userInfo } from "../../queries/queries";

export function setLocalStorageAndVariables(data) {
  localStorage.setItem("login", true);
  localStorage.setItem("userId", data.createNewUser._id);
  userInfo({
    userId: data.createNewUser._id,
    username: data.createNewUser.username,
    firstName: data.createNewUser.firstName,
    lastName: data.createNewUser.lastName,
    isUserLogin: true,
  });
}
