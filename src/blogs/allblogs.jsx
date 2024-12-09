import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { endPoints } from "../../api/endpoints";


export default function BlogHeaders() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("You are not authenticated. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await axiosInstance.get(endPoints.allBlogs.blogs, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("API Response:", response.data);
                if (response.status === 200) {
                    setBlogs(response.data.data || []);
                } else {
                    console.error("Failed to fetch blogs.");
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <Typography align="center">Loading blogs...</Typography>;
    }

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    justifyContent: "center",
                    padding: "20px",
                }}
            >
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <Card
                            key={blog.id || blog._id}
                            style={{
                                maxWidth: "300px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                marginBottom: "20px",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {blog.title || "Untitled Blog"}
                                </Typography>
                                <Typography dangerouslySetInnerHTML={{ __html: `${blog.postText}`.slice(0, 300).concat("...") }}>
                                
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/blogdetails/${blog._id}`} style={{ textDecoration: "none" }}>
                                    <Button size="small" variant="contained" color="primary">
                                        Learn More
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    ))
                ) : (
                    <Typography variant="h6" align="center">
                        No blogs available.
                    </Typography>
                )}
            </div>
        </>
    );
}
