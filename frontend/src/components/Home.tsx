import {
    Button,
    Divider,
    IconButton,
    Input,
    InputBase,
    MenuItem,
    Rating,
    Select,
    TextField,
} from "@mui/material";
import Slider, { Settings } from "react-slick";
import TransparentButton from "./ui/TransparentButton";
import { useEffect, useRef, useState } from "react";
import RoundedButton from "./ui/RoundedButton";
import ExploreCard from "./ui/ExploreCard";
import {
    ChevronLeft,
    ChevronRight,
    DraftsOutlined,
    GppGoodOutlined,
    HeadsetMicOutlined,
    Menu,
    Shield,
    ShieldOutlined,
    ShoppingCartOutlined,
} from "@mui/icons-material";
import useBlogs from "../hooks/useBlogs";
import LearningCard from "./ui/LearningCard";
import TourCard from "./ui/TourCard";
import TestimonialCard from "./ui/TestimonialCard";
import BlogCard from "./ui/BlogCard";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import { useTours } from "../hooks/useTours";
import { ErrorBoundary } from "react-error-boundary";
import { TourList } from "../interfaces/tour.interface";
import ErrorComponent from "./ui/ErrorComponent";
import { useLocations } from "../hooks/useLocations";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { add, format } from "date-fns";

const RecommendedTourList = (props: { tours: TourList }) => {
    const settings: Settings = {
        dots: true,
        infinite: false,
        speed: 750,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1550,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };
    return (
        <ErrorBoundary fallback={<ErrorComponent />}>
            <Slider {...settings}>
                {props.tours.data.map((tour, index) => (
                    <TourCard
                        key={tour.id}
                        name={tour.name}
                        location={tour.location}
                        city={tour.city}
                        rating={1.2}
                        reviews={1234}
                        price={tour.price}
                        image={tour.image}
                        tourId={tour.id}
                    />
                ))}
            </Slider>
        </ErrorBoundary>
    );
};

const Home = () => {
    const { tours, toursLoading, toursError } = useTours({
        categories: null,
        freeCancelationAvailable: null,
        maxPrice: null,
        minPrice: null,
        city: null,
        page: null,
        sortBy: null,
        sortOrder: null,
        startDate: null,
        endDate: null,
        maxDuration: null,
        minDuration: null,
        pageSize: "10",
    });
    const { blogs } = useBlogs({
        page: null,
        category: null,
        pageSize: 3
      });
    const { locations } = useLocations();
    const [selectedLocation, setSelectedLocation] = useState<string>(
        locations?.[0].city || ""
    );
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(
        add(new Date(), { days: 15 })
    );
    const settings: Settings = {
        dots: true,
        infinite: false,
        speed: 750,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1550,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };

    const testimonialSliderSettings: Settings = {
        dots: true,
        infinite: true,
        speed: 750,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };
    const popularDestinations = [
        {
            name: "Nova Scotia",
            image: "/halifax.jpg",
            link: `/search?location=Nova%20Scotia&startDate=${format(startDate || new Date(), 'yyyy-MM-dd')}&endDate=${format(endDate || new Date(), 'yyyy-MM-dd')}`,
        },
        {
            name: "New York",
            image: "/new_york.jpg",
            link: `/search?location=New%20York&startDate=${format(startDate || new Date(), 'yyyy-MM-dd')}&endDate=${format(endDate || new Date(), 'yyyy-MM-dd')}`,
        },
        {
            name: "France",
            image: "/paris.jpg",
            link: `/search?location=France&startDate=${format(startDate || new Date(), 'yyyy-MM-dd')}&endDate=${format(endDate || new Date(), 'yyyy-MM-dd')}`,
        },
        {
            name: "London",
            image: "/london.jpg",
            link: `/search?location=London&startDate=${format(startDate || new Date(), 'yyyy-MM-dd')}&endDate=${format(endDate || new Date(), 'yyyy-MM-dd')}`,
        },
        {
            name: "Japan",
            image: "/tokyo.jpg",
            link: `/search?location=Japan&startDate=${format(startDate || new Date(), 'yyyy-MM-dd')}&endDate=${format(endDate || new Date(), 'yyyy-MM-dd')}`,
        },
        {
            name: "UAE",
            image: "/dubai.jpg",
            link: `/search?location=UAE&startDate=${format(startDate || new Date(), 'yyyy-MM-dd')}&endDate=${format(endDate || new Date(), 'yyyy-MM-dd')}`,
        },
        {
            name: "Australia",
            image: "/sydney.jpg",
            link: `/search?location=Australia&startDate=${format(startDate || new Date(), 'yyyy-MM-dd')}&endDate=${format(endDate || new Date(), 'yyyy-MM-dd')}`,
        },
        {
            name: "Italy",
            image: "/rome.jpg",
            link: `/search?location=Italy&startDate=${format(startDate || new Date(), 'yyyy-MM-dd')}&endDate=${format(endDate || new Date(), 'yyyy-MM-dd')}`,
        },
    ];
    const guides = [
        {
            title: "Things To Do On Your Trip",
            image: "/canyon.jpg",
            pretite: "",
        },
        {
            title: "Up to 70% Discount",
            image: "/beach.jpg",
            pretite: "Enjoy Summer Deals",
        },
    ];
    return (
        <div className="">
            <Header showScrollAnimation={true} />
            <div className="relative h-screen">
                <div className="absolute w-full h-full -z-10">
                    <img
                        className="object-cover w-full h-full"
                        src="/home_bg.jpg"
                        alt="home background"
                    />
                    <div className="absolute top-0 w-full h-full bg-opacity-75 bg-purple"></div>
                </div>
                <div className="flex justify-center h-screen text-white">
                    <div className="w-auto pt-48 md:pt-80 md:w-3/4">
                        <h1 className="mb-6 text-3xl font-semibold tracking-tight text-center md:text-6xl">
                            Find Next Place To Visit
                        </h1>
                        <p className="mb-16 text-center">
                            Discover amazing places at exclusive deals
                        </p>
                        <form>
                            <div className="flex flex-col w-full p-2 text-black bg-white rounded-md h-35 md:h-24 md:rounded-full md:flex-row">
                                <div className="flex flex-col items-end gap-1 pl-8 mb-3 mr-4 basis-10/12 md:flex-row">
                                    <div className="w-full md:basis-6/12">
                                        <div className="text-sm font-medium">
                                            Location
                                        </div>
                                        <Select
                                            label="Location"
                                            value={selectedLocation}
                                            onChange={(e) =>
                                                setSelectedLocation(
                                                    e.target.value
                                                )
                                            }
                                            MenuProps={{
                                                sx: {
                                                    height: "300px",
                                                },
                                            }}
                                            fullWidth
                                            sx={{
                                                outline: "none",
                                                border: "none",
                                            }}
                                        >
                                            {locations?.map((location) => (
                                                <MenuItem value={location.city}>
                                                    {location.city}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="md:basis-3/12">
                                        <DatePicker
                                            label="Start Date"
                                            value={startDate}
                                            onChange={(value) =>
                                                setStartDate(value)
                                            }
                                            disablePast
                                        />
                                    </div>
                                    <div className="md:basis-3/12">
                                        <DatePicker
                                            label="End Date"
                                            value={endDate}
                                            onChange={(value) =>
                                                setEndDate(value)
                                            }
                                            shouldDisableDate={(date) => {
                                                if (startDate) {
                                                    return date < startDate;
                                                }
                                                return false;
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="basis-2/12">
                                    <Link
                                        to={
                                            selectedLocation && startDate && endDate
                                                ? `/search?location=${selectedLocation}&startDate=${format(startDate, 'yyyy-MM-dd')}&endDate=${format(endDate, 'yyyy-MM-dd')}`
                                                : "#"
                                        }
                                    >
                                        <RoundedButton
                                            type="submit"
                                            variant="contained"
                                        >
                                            Search
                                        </RoundedButton>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <div className="container mx-auto">
                    <div className="my-16 mt-32">
                        <h2 className="my-4 text-3xl font-medium tracking-tighter">
                            Popular Destinations
                        </h2>
                        <p className="my-4 mb-12 tracking-tight text-grey">
                            These popular destinations have a lot to offer
                        </p>
                        <div>
                            <Slider {...settings}>
                                {popularDestinations.map(
                                    (destination, index) => (
                                        <ExploreCard
                                            key={index}
                                            title={destination.name}
                                            image={destination.image}
                                            link={destination.link || ""}
                                        />
                                    )
                                )}
                            </Slider>
                        </div>
                    </div>
                    <div className="flex flex-col h-full gap-8 my-16 mt-28 md:flex-row">
                        <div className="md:basis-1/2 h-[300px] mx-2 md:h-[550px]">
                            <LearningCard
                                image={guides[0].image}
                                title={guides[0].title}
                                pretitle={guides[0].pretite}
                            />
                        </div>
                        <div className="md:basis-1/2 h-[300px] mx-2 md:h-[550px]">
                            <LearningCard
                                image={guides[1].image}
                                title={guides[1].title}
                                pretitle={guides[1].pretite}
                            />
                        </div>
                    </div>
                    <div className="my-16 mt-28">
                        <h2 className="my-4 text-3xl font-medium tracking-tighter">
                            Recommended
                        </h2>
                        <p className="my-4 mb-12 tracking-tight text-grey">
                            Top picks curated for you
                        </p>
                        <div>
                            {toursLoading && <p>Loading...</p>}
                            {tours && <RecommendedTourList tours={tours} />}
                            {toursError && (
                                <ErrorComponent error={toursError} />
                            )}
                        </div>
                    </div>
                    <div className="my-16 mt-32">
                        <div className="flex flex-col items-center gap-16 justify-evenly md:flex-row">
                            <div className="flex flex-col items-center w-full max-w-80">
                                <GppGoodOutlined
                                    sx={{
                                        width: "72px",
                                        height: "72px",
                                    }}
                                />
                                <h4 className="my-4 text-xl tracking-tighter text-center">
                                    Best Price Guarantee
                                </h4>
                                <p className="tracking-tighter text-center text-grey">
                                    We ensure the lowest prices for your dream vacations, or we'll match the difference!
                                </p>
                            </div>
                            <div className="flex flex-col items-center w-full max-w-80">
                                <ShoppingCartOutlined
                                    sx={{
                                        width: "72px",
                                        height: "72px",
                                    }}
                                />
                                <h4 className="my-4 text-xl tracking-tighter text-center">
                                    Easy & Quick Booking
                                </h4>
                                <p className="tracking-tighter text-center text-grey">
                                    Effortless and fast booking process to get you on your way without any hassle.
                                </p>
                            </div>
                            <div className="flex flex-col items-center w-full max-w-80">
                                <HeadsetMicOutlined
                                    sx={{
                                        width: "72px",
                                        height: "72px",
                                    }}
                                />
                                <h4 className="my-4 text-xl tracking-tighter text-center">
                                    Customer Care 24/7
                                </h4>
                                <p className="tracking-tighter text-center text-grey">
                                    Round-the-clock support to assist you anytime, anywhere.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-light-blue">
                    <div className="container py-8 mx-auto my-4 xl:py-16">
                        <div className="flex flex-col gap-2 mx-4 xl:flex-row">
                            <div className="xl:basis-4/12">
                                <h3 className="my-8 text-3xl font-medium tracking-tighter">
                                    What our customers are saying us?
                                </h3>
                                <p className="mt-8 mb-6 text-grey xl:mb-20">
                                    Our customers rave about their seamless booking experiences and unforgettable trips. They appreciate our commitment to offering the best prices and our 24/7 customer support, making their travel planning stress-free and enjoyable. Hear directly from our satisfied travelers and see why they keep coming back!
                                </p>
                                <div className="flex flex-col items-center gap-8 xl:gap-32 xl:flex-row">
                                    <div>
                                        <div className="text-3xl font-semibold">
                                            13m+
                                        </div>
                                        <div className="text-grey">
                                            Happy People
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-semibold">
                                            4.88
                                        </div>
                                        <div className="text-grey">
                                            Overall rating
                                        </div>
                                        <Rating
                                            value={4.88}
                                            readOnly
                                            size="small"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="xl:basis-8/12 max-w-[900px]">
                                <Slider {...testimonialSliderSettings}>
                                    <TestimonialCard name="John Doe" designation="Software Engineer" review="I had an amazing experience booking my vacation through this website. The process was quick and easy, and the customer support team was incredibly helpful. Highly recommend!" />
                                    <TestimonialCard name="Jane Smith" designation="Marketing Manager" review="This is my go-to site for all my travel needs. They offer the best prices, and their 24/7 customer care ensures I'm always taken care of. Five stars!" />
                                    <TestimonialCard name="Emily Johnson" designation="Teacher" review="Planning a trip has never been this hassle-free! The booking was straightforward, and I felt supported throughout my entire journey. A wonderful service!" />
                                    <TestimonialCard name="Michael Brown" designation="Sales Executive" review="I was impressed with the level of service and the ease of booking my holiday. The customer care team was always available to answer my questions, making the entire experience smooth and enjoyable." />
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto">
                    <div className="mt-32 mb-16 ">
                        <h3 className="text-3xl font-semibold text-center">
                            Get inspiration for your next trip
                        </h3>
                        <p className="my-2 text-center text-grey">
                            Here's our latest blogs
                        </p>
                        <div className="flex flex-col gap-12 mx-4 my-12 md:flex-row md:mx-0">
                            {blogs?.data.map((blog:any) => (
                                <BlogCard
                                    key={blog.id}
                                    id={blog.id}
                                    title={blog.title}
                                    date={blog.createdAt}
                                    image={blog.thumbnail}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between bg-purple">
                    <div className="container flex flex-col justify-between mx-auto my-16 md:flex-row">
                        <div className="flex flex-col items-center mx-4 md:flex-row basis-6/12 md:mx-0">
                            <DraftsOutlined
                                sx={{
                                    width: "64px",
                                    height: "64px",
                                    color: "white",
                                }}
                            />
                            <div className="pl-8">
                                <h4 className="my-2 text-xl font-semibold text-white">
                                    Your Travel Journey Starts Here
                                </h4>
                                <p className="text-white">
                                    Stay up to date with our latest news and
                                    offers
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 mx-4 h-14 basis-6/12 md:flex-row md:mx-0">
                            <div className="bg-white rounded-md grow">
                                <TextField placeholder="Your email" fullWidth />
                            </div>
                            <Button variant="contained">Subscribe</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <Footer />
            </div>
        </div>
    );
};

export default Home;
