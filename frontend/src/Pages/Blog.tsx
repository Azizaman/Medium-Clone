import { Fullblog } from "../Components/Fullblog";
import { Appbar } from "../Components/Appbar";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { Spinner } from "../Components/Spinner";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog, error } = useBlog({ id: id || "" });

  console.log('Blog component - loading:', loading);
  console.log('Blog component - error:', error);
  console.log('Blog component - blog:', blog);

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Appbar />
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center text-red-500">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <Appbar />
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            Blog not found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      
      <Fullblog blog={blog} />
    </div>
  );
};
