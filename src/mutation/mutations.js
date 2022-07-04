import { gql, makeVar } from "@apollo/client";

export const CREATE_NEW_BLOG = gql`
  mutation Mutation($title: String, $post: String, $createdBy: String) {
    createNewBlog(title: $title, post: $post, createdBy: $createdBy) {
      title
      post
      _id
      createdBy {
        _id
        username
        firstName
        lastName
      }
      createdAt
    }
  }
`;

export const USER_LOGIN = gql`
  mutation LoginUser($username: String, $password: String) {
    loginUser(username: $username, password: $password) {
      _id
      firstName
      lastName
      username
      bookmarks {
        blogId {
          _id
        }
      }
    }
  }
`;
export const ADD_BLOG_IN_BOOKMARK = gql`
  mutation Mutation($blogId: String, $userId: String) {
    createNewBookMark(blogId: $blogId, userId: $userId) {
      _id
      blogId {
        _id
        title
        post
        createdBy {
          _id
          username
        }
        createdAt
        bookmarkBy {
          _id
        }
      }
      userId {
        _id
        username
      }
    }
  }
`;
export const REMOVE_BLOG_FROM_BOOKMARK = gql`
  mutation Mutation($removeBookmarkId: String) {
    removeBookmark(id: $removeBookmarkId)
  }
`;

export const CREATE_NEW_USER = gql`
  mutation Mutation(
    $firstName: String
    $lastName: String
    $username: String
    $password: String
  ) {
    createNewUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
    ) {
      _id
      firstName
      lastName
      username
    }
  }
`;
