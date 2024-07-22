import { useEffect, useState } from "react";
import axios from "axios";
import {BACKEND_URL} from "../Config.ts";






export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string | null;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching blog with id:', id);
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        console.log('API response:', response.data);
        setBlog(response.data); // Set the state with the response data directly
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching blog:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
    error,
  };
};



export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            });
    }, []);

    return {
        loading,
        blogs,
    };
};
