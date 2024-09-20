// Author: Meer Patel

import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import FaqImage from "../assets/faq.svg";
import Footer from "./ui/Footer";
import Header from "./ui/Header";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&::before": {
        display: "none",
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, .05)"
            : "rgba(0, 0, 0, .02)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const faqData = [
    {
        question: "Why are the prices of Nomadic so affordable?",
        answer: "Nomadic is a customer-oriented specialist tour operator. We focus our efforts on only a select group of incredible destinations, gaining unparalleled insight into a region and its culture. This expertise is then reflected to all aspects of your tour from our amazing prices to the handpicked activities to make it an unforgettable adventure. Together with our customer-oriented approach, Nomadic’s ultimate goal is to deliver the value back to our guests and share experiences of a lifetime without breaking the bank.",
    },
    {
        question: "Can I book a pre or post tour accommodation?",
        answer: "Depending on your destination, dates and hotel availability, we may be able to arrange pre/post-tour accommodation with our special prices. You can add pre or post accommodation during the booking process. Please contact us for detailed information.",
    },
    {
        question: "What type of people travel with Nomadic?",
        answer: "Our tours are suitable for any traveller above 18 years old. The majority of Travel Talkers are from the United Kingdom, Australia, New Zealand, USA, Canada or Europe, however we always have travellers from all over the world. What brings them together is a passion for travel, discovering authentic cultures and experiencing unique adventures with like-minded travellers.",
    },
    {
        question:
            "I’m scheduled to travel. Are we still going and when will I be notified?",
        answer: "Our teams around the world continue to assess matters daily. In the event that the international and domestic travel bans and restrictions, governmental orders, and public health advisories will not be sufficiently lifted in time for your tour to depart as scheduled, we will notify you around 45 days prior to departure. If these restrictions are not lifted in time, we will work with you to re-evaluate your plans and options for travel. If they are lifted allowing travel, we will also confirm this around 45 days prior to your departure along with any potential changes to your tours itinerary.",
    },
    {
        question:
            "Will you run tours even if not everything is open in that country?",
        answer: "Yes, it is likely that we would run tours even if not everything is opened provided that it doesn't sacrifice the experience for our travelers. We review each country to assess any border restrictions, and confirm flights are operating between the U.S. and that destination. We are continuously communicating with our suppliers to review and uphold our safety protocols and safe travel standards, and are working with our local staff to thoroughly understand the environment of our destinations before we travel there. It’s important to us that we are providing our travelers with immersive, cultural experiences, so we also carefully assess whether points of interest are open to travelers and whether new policies and social distancing standards will inhibit a traveler’s experience.",
    },
];

export default function FAQ() {
    const [expanded, setExpanded] = React.useState<string | false>("panel1");
    const theme = useTheme();
    const isTabletOrSmaller = useMediaQuery(theme.breakpoints.down("md"));
    const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

    const handleChange =
        (panel: string) =>
            (event: React.SyntheticEvent, newExpanded: boolean) => {
                setExpanded(newExpanded ? panel : false);
            };

    return (
        <>
            <div className="h-[85px]">
                <Header />
            </div>
            <Box
                display="flex"
                flexDirection={isTabletOrSmaller ? "column" : "row"}
                justifyContent="center"
                alignItems="center"
                p={isPhone ? 2 : 10}
            >
                <Box
                    component="img"
                    sx={{
                        height: { xs: 233, md: 500, lg: 600 },
                        width: { xs: "100%", md: 500, lg: 600 },
                        mb: { xs: 2, sm: 0 },
                    }}
                    alt="FAQ illustration"
                    src={FaqImage}
                />
                <Box
                    sx={{
                        width: { xs: "100%", md: "60%" },
                        mx: isPhone ? 1 : 5,
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            fontSize: {
                                xs: "1.5rem",
                                sm: "2rem",
                                md: "2.5rem",
                            },
                            textAlign: {
                                xs: "center",
                                sm: "center",
                                md: "left",
                            },
                        }}
                    >
                        Frequently Asked Questions
                    </Typography>
                    <br />
                    {faqData.map((faq, index) => (
                        <Accordion
                            key={index}
                            expanded={expanded === `panel${index}`}
                            onChange={handleChange(`panel${index}`)}
                        >
                            <AccordionSummary
                                aria-controls={`panel${index}d-content`}
                                id={`panel${index}d-header`}
                            >
                                <Typography>{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{faq.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Box>
            <Footer />
        </>
    );
}
