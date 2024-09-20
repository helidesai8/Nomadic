import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft } from "@mui/icons-material";

export interface BlogPost {
    id?: number;
    title: string;
    content: string;
    category: string;
    thumbnail_url: string;
    description: string;
}
const categories = [
    "Travel",
    "Food",
    "Lifestyle",
    "Fashion",
    "Fitness",
    "Health",
    "Technology",
    "Business",
    "Entertainment",
    "Sports",
];

interface BlogFormProps {
    page_title: string;
    button_text: string;
    showBackButton?: boolean;
    blog?: BlogPost;
    onSubmit: (data: BlogPost) => Promise<void>;
}

const BlogForm: React.FC<BlogFormProps> = (props) => {
    const [blogPost, setBlogPost] = useState<BlogPost>(
        props.blog || {
            title: "",
            content: "",
            category: "",
            thumbnail_url: "",
            description: "",
        }
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBlogPost({ ...blogPost, [name]: value });
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const name = event.target.name as keyof typeof blogPost;
        setBlogPost({
            ...blogPost,
            [name]: event.target.value,
        });
    };

    const handleSubmit = async () => {
        await props.onSubmit({
            title: blogPost.title,
            content: blogPost.content,
            category: blogPost.category,
            description: blogPost.description,
            thumbnail_url: blogPost.thumbnail_url,
        });
        setBlogPost({
            title: "",
            content: "",
            category: "",
            thumbnail_url: "",
            description: "",
        });
    };

    return (
        <Box sx={{ pt: 20, mb: 20 }}>
            {props.showBackButton && <Link to="/manage/blog" style={{ textDecoration: "none" }}><ChevronLeft /> Go back</Link>}
            <Typography variant="h4" gutterBottom>
                {props.page_title}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        id="title"
                        label="Title"
                        name="title"
                        value={blogPost.title}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        id="description"
                        label="Description"
                        name="description"
                        value={blogPost.description}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            name="category"
                            value={blogPost.category}
                            onChange={handleSelectChange}
                        >
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        id="content"
                        label="Content"
                        name="content"
                        multiline
                        rows={4}
                        value={blogPost.content}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        id="thumbnail_url"
                        label="Thumbnail URL"
                        name="thumbnail_url"
                        value={blogPost.thumbnail_url}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={() => handleSubmit()}
                        fullWidth
                        style={{ background: "#2F365F", color: "white" }}
                    >
                        {props.button_text}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BlogForm;
