import { useQuery } from "@apollo/client";
import { GET_ALL_BLOGS } from "../../queries/queries";
import { LoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner";
import { NavBar } from "../components/Navbar/Navbar";
import { PostCard } from "../components/PostCard/PostCard";
import "./home.css";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_BLOGS);
  return (
    <div className="home">
      <NavBar />
      <main className="main">
        {
          loading === true && <LoadingSpinner isDefaultCss={true} color='black'/>
        }
        {data &&
          data?.getAllBlogs?.map((blog) => {
            return <PostCard key={blog._id} blog={blog} />;
          })}
          
      </main>
    </div>
  );
}
