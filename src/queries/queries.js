import { gql, makeVar } from "@apollo/client";

export const userInfo = makeVar({
  userId: localStorage.getItem("userId") || null,
  isUserLogin: localStorage.getItem("login") || false,
  firstName: "",
  lastName: "",
});

export const CHECK_USER_LOGIN = gql`
  query checkUserLogin {
    isUserLogin @client
  }
`;
export const GET_USER_LOGIN_INFO = gql`
  query getUserLoginInfo {
    userInfo @client
  }
`;


export const GET_USER_DATA_BY_ID = gql`
  query Query($userId: String) {
    getUserData(userId: $userId) {
      _id
      firstName
      lastName
      username
    }
  }
`;

export const GET_ALL_BLOGS = gql`
  query Query {
    getAllBlogs {
      _id
      post
      title
      createdBy {
        username
        _id
      }
      createdAt
      bookmarkBy {
        _id
      }
    }
  }
`;




export const GET_USER_BOOKMARKS = gql`
  query Query($userId: String) {
    getUserBookmark(userId: $userId) {
      _id
      userId {
        username
        _id
      }
      blogId {
        _id
        title
        post
        createdBy {
          _id
          firstName
          lastName
          username
        }
        createdAt
      }
    }
  }
`;






