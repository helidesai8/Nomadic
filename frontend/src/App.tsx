import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FAQPage from './pages/FAQPage';
import HomePage from './pages/HomePage';
import ContactUsPage from './pages/ContactUsPage';
import SearchPage from './pages/SearchPage';
import ReviewForm from './pages/ReviewForm';
import TourDetail from './pages/TourDetail';
import HistoryPage from './pages/HistoryPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './pages/ResetPassword';
import { Toaster } from 'react-hot-toast';
import Manage_Listing from './pages/Manger_Dashboard/Manage_Listing';
import AddTourPage from './pages/Manger_Dashboard/Add_Tours';
import PlanDetails from './pages/Manger_Dashboard/Plan_Details_Page';
import CreateTourPackage from './pages/Manger_Dashboard/CreateTourCategory';
import Blog from './pages/Blog';
import BlogDetailsPage from './pages/BlogDetailsPage';
import { Wishlist } from './pages/Wishlist';
import AnalyticsPage from './pages/AnalyticsPage';
import AddBlogForm from './pages/Manger_Dashboard/AddBlogForm';
import UpdateBlogForm from './pages/Manger_Dashboard/UpdateBlogForm';
import ManageBlogList from './pages/Manger_Dashboard/ManageBlogList';
import Protected from './utils/Protected';
import { getRole } from './utils/authUtils';
import ScrollToTop from './utils/ScrollToTop';
import { ContextProvider } from './Context/Context';

function App() {
    const role=getRole();
    console.log("Role:::",role);
    return (
        <div>
            <ContextProvider>
                <Router>
                    <ToastContainer />
                    <Routes>
                        <Route element={<Protected />}>
                            <Route path="/manage" element={role==="ADMIN"?<Manage_Listing />:<HomePage/>} />
                            <Route path="/manage/add-tour" element={role==="ADMIN"?<AddTourPage />:<HomePage/>} />
                            <Route path="/manage/plan-details/:id" element={role==="ADMIN"?<PlanDetails />:<HomePage/>} />
                            <Route path="/manage/create-package" element={role==="ADMIN"?<CreateTourPackage />:<HomePage/>} />
                            <Route path="/manage/blog" element={role==="ADMIN"?<ManageBlogList />:<HomePage/>} />
                            <Route path="/manage/blog/add" element={role==="ADMIN"?<AddBlogForm />:<HomePage/>} />
                            <Route path="/manage/blog/:blogId/update" element={role==="ADMIN"?<UpdateBlogForm />:<HomePage/>} />
                            <Route path="/wishlist" element={<Wishlist />} />
                            <Route path="/history/:id" element={<HistoryPage />} />
                            <Route path="/reviews" element={<ReviewForm />} />
                            <Route path="/analytics" element={role==="ADMIN"?<AnalyticsPage />:<HomePage/>}/>
                        </Route>
                        <Route path="/contactus" element={<ContactUsPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                        <Route path="/blogs" element={<Blog />} />
                        <Route path="/blogs/:id" element={<BlogDetailsPage />} />
                        <Route path="/tours/:id" element={<TourDetail />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/faq" element={<FAQPage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                    </Routes>
                    <ScrollToTop />
                </Router>
                <Toaster />
            </ContextProvider>
        </div>
    );
}

export default App;
