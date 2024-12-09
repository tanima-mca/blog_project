import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import { endPoints } from "../../api/endpoints";
import axiosInstance from "../../api/axios";
import { ArrowBackIosNew } from "@mui/icons-material";

export default function Blogdetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        console.log(`Fetching blog details for ID: ${id}`);
        const response = await axiosInstance.get(endPoints.allBlogs.blogdel + id);

        if (response.status === 200) {
          setBlog(response.data.data);
        } else {
          console.error("Failed to fetch blog details.");
        }
      } catch (err) {
        console.error("Error fetching blog details:", err);
      }
    };

    fetchBlogDetails();
  }, [id]);

  return (
    <Box bgcolor={"#f5f5f5"} padding={4}>
      <Typography variant="h1" fontSize={40} gutterBottom>
        {blog?.title || "Loading..."}
      </Typography>

      {blog?.category
        ? blog.category.split("\n").map((paragraph, index) => (
          <Typography dangerouslySetInnerHTML={{ __html: `${blog.postText}`.slice(0, 300).concat("...") }}></Typography>
        ))
        : "Loading content..."}


      <Link to="/allblogs" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ArrowBackIosNew />}
        >
          Back to allBlogs Page
        </Button>
      </Link>
    </Box>
  );
}
