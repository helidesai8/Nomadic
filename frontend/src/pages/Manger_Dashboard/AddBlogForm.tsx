import React from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useBlog from "../../hooks/useBlogs";
import Header from "../../components/ui/Header";
import BlogForm, { BlogPost } from "../../components/blog/BlogForm";
import Footer from "../../components/ui/Footer";

const AddBlogForm: React.FC = () => {
    const { userId } = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : ""
    const navigate = useNavigate();
    const { addBlogMutation } = useBlog({
        page: null,
        category: null,
        pageSize: null,
    });

    const handleSubmit = async (blog: BlogPost) => {
        try {
            await addBlogMutation.mutateAsync({
                title: blog.title,
                content: blog.content,
                category: blog.category,
                description: blog.description,
                thumbnail: blog.thumbnail_url,
                userId: userId,
            });
            toast.success("Blog post created/updated successfully");
            navigate("/manage/blog");
        } catch (error) {
            console.error("Failed to create/update blog post:", error);
            toast.error("Failed to create/update blog post. Please try again.");
        }
    };
    return (
        <>
            <Header />
            <Container component="main" maxWidth="md">
                <BlogForm showBackButton={true} page_title="Create new blog" onSubmit={handleSubmit} button_text={"Save"}/>
            </Container>
            <Footer />
        </>
    );
};

export default AddBlogForm;
