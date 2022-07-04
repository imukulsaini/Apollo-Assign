import { NavBar } from "../components/Navbar/Navbar";
import "./createPost.css";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_BLOGS, GET_USER_LOGIN_INFO } from "../../queries/queries";
import { useEffect } from "react";
import { CREATE_NEW_BLOG } from "../../mutation/mutations";
import { LoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner";



export default function CreatePost() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
    setValue,
  } = useForm();

  // Creating A new Blog 
  const [createPost, { loading: createBlogLoading, data }] = useMutation(
    CREATE_NEW_BLOG,
    {
      update(cache, { data }) {
        const dataAllow = cache.readQuery({
          query: GET_ALL_BLOGS,
        });
        let newBlogData = { ...data.createNewBlog, bookmarkBy: [] };
        cache.writeQuery({
          query: GET_ALL_BLOGS,
          data: {
            getAllBlogs: [...dataAllow.getAllBlogs, newBlogData],
          },
        });
      },
    }
  );
  // getting Access the User Login Reactive variable make sure this should not be null
  const {
    data: { userInfo },
  } = useQuery(GET_USER_LOGIN_INFO);

  useEffect(() => {
    setFocus("title");
  }, []);

  useEffect(() => {
    if (data && data.createNewBlog !== null && createBlogLoading === false) {
      setValue("title", "");
      setValue("post", "");
    }
  }, [createBlogLoading, data]);

  async function createNewPost(data) {
    createPost({
      variables: {
        title: data.title,
        post: data.post,
        createdBy: userInfo.userId,
      },
    });
  }

  function clearData() {
    setValue("title", "");
    setValue("post", "");
  }

  return (
    <div className="create-post">
      <NavBar />
      <main className="create-post__main">
        <form
          className="home-main__form"
          onSubmit={handleSubmit(createNewPost)}
        >
          <div className="form__title">
            <input
              {...register("title", {
                required: true,
              })}
              placeholder="add title"
              className="form-title__input"
            />
          </div>
          <div className="main__action-contain">
            <button
              disabled={createBlogLoading === true}
              type="submit"
              className="main__action-name"
            >
              Save
              {createBlogLoading === true && (
                <LoadingSpinner
                  size={"0.5rem"}
                  color="black"
                  isDefaultCss={false}
                />
              )}
            </button>
            <button onClick={() => clearData()} className="main__action-name">
              Clear
            </button>
          </div>
          <div className="form__textarea">
            <textarea
              {...register("post", {
                required: true,
              })}
              placeholder="Write a greate Post"
              className="form-textarea__input"
            />
          </div>
        </form>
      </main>
    </div>
  );
}
