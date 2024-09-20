import React from "react";
import BlogForm, { BlogPost } from "../../components/blog/BlogForm";
import Header from "../../components/ui/Header";
import { CircularProgress, Container, Icon, IconButton } from "@mui/material";
import Footer from "../../components/ui/Footer";
import useBlogDetail from "../../hooks/useBlogDetail";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateBlogForm = () => {
    const { userId } = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : ""
    const { blogId } = useParams();
    const { blogDetail, blogDetailLoading, updateBlogMutation } =
        useBlogDetail(blogId);
    const navigate = useNavigate();

    const handleSubmit = async (blog: BlogPost) => {
        try {
            await updateBlogMutation.mutateAsync({
                title: blog.title,
                content: blog.content,
                category: blog.category,
                description: blog.description,
                thumbnail: blog.thumbnail_url,
                userId: userId,
            });
            toast.success("Blog post updated successfully");
            navigate("/manage/blog");
        } catch (error) {
            console.error("Failed to create/update blog post:", error);
        }
    };
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header />
            <Container
                sx={{
                    marginTop: "64px",
                }}
                component="main"
                maxWidth="md"
            >
                {blogDetailLoading && (
                    <div className="flex items-center justify-center">
                        <CircularProgress />
                    </div>
                )}
                {blogDetail && (
                    <BlogForm
                        showBackButton={true}
                        page_title="Update blog"
                        onSubmit={handleSubmit}
                        blog={{
                            category: blogDetail.category,
                            content: blogDetail.content,
                            description: blogDetail.description,
                            thumbnail_url: blogDetail.thumbnail,
                            title: blogDetail.title,
                        }}
                        button_text={"Update blog"}
                    />
                )}
            </Container>
            <Footer />
        </div>
    );
};

export default UpdateBlogForm;
