import "./postcard.css";
import NoAvatar from "../../../assets/NoAvatarImage.jpg";
import { format } from "timeago.js";
import {useMutation, useQuery } from "@apollo/client";

import {
  GET_ALL_BLOGS,
  GET_USER_BOOKMARKS,
  GET_USER_LOGIN_INFO,
} from "../../../queries/queries";
import {
  ADD_BLOG_IN_BOOKMARK,
  REMOVE_BLOG_FROM_BOOKMARK,
} from "../../../mutation/mutations";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export function PostCard({ blog, location }) {

  const { title, post, createdAt, createdBy, _id, bookmarkBy } = blog;
  const {
    data: { userInfo },
  } = useQuery(GET_USER_LOGIN_INFO);

  const [saveBookmark, { loading:addBookmarkLoading }] = useMutation(ADD_BLOG_IN_BOOKMARK, {
    update(cache, { data }) {
      const dataAllow = cache.readQuery({
        query: GET_ALL_BLOGS,
      });
      cache.writeQuery({
        query: GET_ALL_BLOGS,
        data: {
          getAllBlogs: dataAllow.getAllBlogs.map((blog) =>
            blog._id === data.createNewBookMark.blogId._id
              ? { ...blog, bookmarkBy: [...bookmarkBy, userInfo.userId] }
              : blog
          ),
        },
      });
    },
  });

  const [removeBookmark,{loading:removeBookmarkLoading}] = useMutation(REMOVE_BLOG_FROM_BOOKMARK, {
    update(cache, { data }) {
      const dataAllow = cache.readQuery({
        query: GET_USER_BOOKMARKS,
        variables: {
          userId: userInfo.userId,
        },
      });
      cache.writeQuery({
        query: GET_USER_BOOKMARKS,
        variables: {
          userId: userInfo.userId,
        },
        data: {
          getUserBookmark: dataAllow.getUserBookmark.filter(
            (blog) => blog.blogId._id !== _id
          ),
        },
      });
    },
  });

  function removeBlogFromBookmark(blogID) {
    removeBookmark({
      variables: {
        id: blogID,
      },
    });
  }
  function addToBookmark(id) {
    saveBookmark({
      variables: {
        blogId: id,
        userId: userInfo.userId,
      },
    });
  }
  function checkBlogInUserBookmark({ userID, bookmarkBy }) {
    return bookmarkBy && bookmarkBy.some((bookmark) => bookmark._id === userID);
  }
  const checkIsBlogBookmark =
    bookmarkBy &&
    userInfo.userId &&
    checkBlogInUserBookmark({
      userID: userInfo.userId,
      bookmarkBy,
    });

  return (
    <div className="postcard">
      <div className="post__avatar">
        <img
          alt={createdBy?.username}
          className="avatar-image"
          src={NoAvatar}
        />
      </div>

      <div className="post__right">
        <span className="post__address">
          From :
          <strong className="highlight__info">{createdBy.username}</strong>
        </span>

        <span className="post__subject">
          Title : <strong className="highlight__info">{title}</strong>
        </span>

        <p className="post__des">{post}</p>

        <div className="post__footer">
          <span className="post__date">createdAt : {format(createdAt)}</span>
          {checkIsBlogBookmark ? (
            <span className="post__isfavorite">Saved</span>
          ) : location === "bookmark" ? (
            <button
              disabled={removeBookmarkLoading === true}
              className="bookmark__button"
              onClick={() => removeBlogFromBookmark(_id)}
            >
              Remove From Book mark
              {
                removeBookmarkLoading === true &&
                <LoadingSpinner
                color={'black'}
                isDefaultCss={false}
                size="1rem"
                />
              }
            </button>
          ) : (
            <button
              disabled={addBookmarkLoading === true}
              className="bookmark__button"
              onClick={() => addToBookmark(_id)}
            >
              Add to Bookmark
              {
                addBookmarkLoading === true &&
                <LoadingSpinner
                color={'black'}
                isDefaultCss={false}
                size="1rem"
                />
              }
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
