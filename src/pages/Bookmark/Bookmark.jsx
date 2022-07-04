import { NavBar } from "../components/Navbar/Navbar";
import { PostCard } from "../components/PostCard/PostCard";
import { BookmarkHeader } from "./components/BookmarkHeader/BookmarkHeader";
import "./bookmark.css";
import { useQuery } from "@apollo/client";
import { GET_USER_BOOKMARKS, GET_USER_LOGIN_INFO } from "../../queries/queries";

export default function Bookmark() {
  const {
    data: { userInfo },
  } = useQuery(GET_USER_LOGIN_INFO);
  const { data } = useQuery(GET_USER_BOOKMARKS, {
    variables: {
      userId: userInfo.userId,
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <div className="bookmark">
      <NavBar />
      <BookmarkHeader name="Bookmarks : " />
      <main className="bookmark__main">
        {data &&
          data?.getUserBookmark.map((blog) => {
            return (
              <PostCard
                key={blog.blogId._id}
                location="bookmark"
                blog={blog.blogId}
              />
            );
          })}
      </main>
    </div>
  );
}
