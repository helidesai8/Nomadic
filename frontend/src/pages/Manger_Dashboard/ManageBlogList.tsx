import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    TableFooter,
    TablePagination,
    Box,
    CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import useBlog from "../../hooks/useBlogs";
import Header from "../../components/ui/Header";
import { toast } from "react-toastify";
import Footer from "./Footer";

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </Box>
    );
}

const BlogManagement = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const { blogs, blogsLoading, blogsError, deleteBlogMutation } = useBlog({
        page: (page + 1).toString(),
        category: null,
        pageSize: rowsPerPage,
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const [confirmationText, setConfirmationText] = useState("");
    const navigate = useNavigate();

    const handleAddBlogClick = () => navigate("/manage/blog/add");
    const handleEditClick = (id) => navigate(`/manage/blog/${id}/update`);

    const handleDeleteClick = (blog) => {
        setBlogToDelete(blog);
        setOpenDialog(true);
    };

    const handleConfirmDelete = async () => {
        // Add deletion logic here3
        await deleteBlogMutation.mutateAsync(blogToDelete.id);
        toast.success("Blog deleted successfully");
        setOpenDialog(false);
        setBlogToDelete(null);
        setConfirmationText("");
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setBlogToDelete(null);
        setConfirmationText("");
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    if (blogsError) return <div>Error loading blogs</div>;

    return (
        <>
            <Header />
            <Box sx={{ padding: 16 }}>
                <Typography variant="h4" gutterBottom>
                    Blog Management
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddBlogClick}
                    sx={{ marginBottom: 2 }}
                >
                    Add Blog
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {blogsLoading && (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <CircularProgress />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )}
                            {blogs?.data.map((blog) => (
                                <TableRow key={blog.id}>
                                    <TableCell>{blog.title}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            blog.createdAt
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                handleEditClick(blog.id)
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={() =>
                                                handleDeleteClick(blog)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                    colSpan={3}
                                    count={blogs?.meta.total}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            "aria-label": "rows per page",
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>

                <Dialog open={openDialog} onClose={handleDialogClose}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To confirm deletion, type the name of the blog: "
                            {blogToDelete?.title}"
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Confirm Blog Title"
                            fullWidth
                            value={confirmationText}
                            onChange={(e) =>
                                setConfirmationText(e.target.value)
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button
                            color="secondary"
                            onClick={handleConfirmDelete}
                            disabled={confirmationText !== blogToDelete?.title}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <Footer />
        </>
    );
};

export default BlogManagement;
