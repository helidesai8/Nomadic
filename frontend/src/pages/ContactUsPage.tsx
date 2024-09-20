import React from "react";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import aboutUs from "../assets/AboutUs.png";
import contactUs from "../assets/ContactUs.webp";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { set } from "date-fns";

const Section = styled("section")({
    padding: "2rem 0",
});

const AboutSection = styled(Section)({
    backgroundColor: "#f0f8ff",
});

const ContactSection = styled(Section)({
    backgroundColor: "#f5f5f5",
});

const GeneralInfoSection = styled(Section)({
    backgroundColor: "#f0f8ff",
});

const StyledTypography = styled(Typography)({
    fontFamily: "Arial, sans-serif",
    fontWeight: 700,
    color: "#333",
});

const AboutUsText = styled(StyledTypography)({
    fontFamily: "Georgia, serif",
    fontSize: "1.2rem",
    fontWeight: 400,
    color: "#444",
});

const ContactUsText = styled(StyledTypography)({
    fontFamily: "Verdana, sans-serif",
    fontSize: "1.1rem",
    fontWeight: 400,
    color: "#555",
});

const AboutUsGrid = styled(Grid)({
    "@media (max-width: 900px)": {
        flexDirection: "column-reverse",
    },
});

const ContactUsPage: React.FC = () => {
    const URL = import.meta.env.VITE_BASE_API_URL;
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        message: "",
    });

    const validate = () => {
        return formData.name !== "" && formData.email !== "" && formData.message !== "";
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(formData);
        if (validate()) {
            try {
                const data = axios.post(`${URL}/api/v1/contact`, formData);
                toast.success("Email sent successfully");
            } catch (error) {
                toast.error("Failed to send email");
            }
        } else {
            toast.error("Please fill out all fields");
        }
    };
    return (
        <>
            <div className="h-[85px]">
                <Header />
            </div>
            <Box>
                <AboutSection>
                    <AboutUsGrid container spacing={4} className="px-20">
                        <Grid item xs={12} md={6}>
                            <StyledTypography variant="h4" gutterBottom>
                                About Us
                            </StyledTypography>
                            <AboutUsText variant="body1">
                                <strong>Welcome to Nomadic!</strong>
                                <br/>
                                <br/>
                                <span>
                                At Nomadic, we believe that travel is more than just a journey—it's an adventure waiting to unfold. We are a passionate team dedicated to curating unforgettable travel experiences that inspire and connect people from around the world.
                                </span>
                               <br /> <br />
                               <strong>Our Mission</strong>
                                <br/>
                                <br/>
                                <span></span>
                                Our mission is to make travel accessible, enjoyable, and enriching for everyone. We strive to offer personalized tours and travel packages that cater to diverse interests, from thrilling adventures to serene getaways. Whether you’re a seasoned traveler or embarking on your first trip, Nomadic is here to guide you every step of the way.
                            </AboutUsText>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={aboutUs}
                                alt="About Us"
                                style={{ width: "80%" }}
                            />
                        </Grid>
                    </AboutUsGrid>
                </AboutSection>
                <ContactSection>
                    <Grid container spacing={4} className="px-20">
                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={contactUs}
                                alt="Contact Us"
                                style={{ width: "60%" }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <StyledTypography variant="h4" gutterBottom>
                                Contact Us
                            </StyledTypography>
                            <ContactUsText variant="body1">
                                Please fill out the form below to contact us.
                            </ContactUsText>
                            <br />
                            <form noValidate autoComplete="off">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            variant="outlined"
                                            required
                                            name="name"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            type="email"
                                            label="Email"
                                            variant="outlined"
                                            required
                                            name="email"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Message"
                                            variant="outlined"
                                            multiline
                                            rows={4}
                                            required
                                            name="message"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </ContactSection>
                <GeneralInfoSection>
                    <Box mt={4} className="px-20">
                        <StyledTypography variant="h4" gutterBottom>
                            General Info
                        </StyledTypography>
                        <ContactUsText variant="body1">
                            For general inquiries, you can reach us at:
                        </ContactUsText>
                        <Box mt={2}>
                            <ContactUsText variant="body1">
                                Phone: (123) 456-7890
                            </ContactUsText>
                            <ContactUsText variant="body1">
                                Email: info@company.com
                            </ContactUsText>
                            <ContactUsText variant="body1">
                                Address: 1234 Street Name, City, State, Zip Code
                            </ContactUsText>
                        </Box>
                    </Box>
                </GeneralInfoSection>
            </Box>
            <div className="mt-16">
                <Footer />
            </div>
        </>
    );
};

export default ContactUsPage;
