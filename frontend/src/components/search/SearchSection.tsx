// author: Smit Patel
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useLocations } from "../../hooks/useLocations";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { add, format } from "date-fns";

const SearchSection = ({
    selectedCityName,
    startDate,
    endDate,
}: {
    selectedCityName: string | null;
    startDate: string | null;
    endDate: string | null;
}) => {
    const { locations } = useLocations();
    const [selectedCity, setSelectedCity] = useState<string>(
        selectedCityName || ""
    );
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
        startDate ? new Date(startDate) : null
    );
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
        endDate ? new Date(endDate) : null
    );
    const navigate = useNavigate();

    const onSearch = () => {
        let query = "";
        if (selectedCity) {
            query += `?location=${selectedCity}`;
        }
        if (selectedStartDate) {
            query += `&startDate=${format(selectedStartDate!, "yyyy-MM-dd")}`;
        }
        if (selectedEndDate) {
            query += `&endDate=${format(selectedEndDate!, "yyyy-MM-dd")}`;
        }
        navigate(`/search${query}`, {
            replace: true,
        });
    }

    return (
        <div className="bg-light-gray py-4 pb-8 pt-32">
            <div className="container mx-auto">
                <h1 className="text-3xl font-medium text-center pt-8 mb-8">
                    Tours in {" " + selectedCityName}
                </h1>
                <div className="my-2 p-4 bg-white flex flex-col lg:flex-row rounded-lg">
                    <div className="flex mt-4 lg:mt-0 lg:ml-4 basis-11/12">
                        <LocationOnOutlinedIcon className="text-gray" />
                        <div className="ml-2 grow flex gap-x-2 flex-col md:flex-row gap-4">
                            <FormControl fullWidth variant="standard">
                                <InputLabel id="demo-simple-select-standard-label">
                                    Location
                                </InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={selectedCity}
                                    onChange={(e) => {
                                        setSelectedCity(
                                            e.target.value as string
                                        );
                                    }}
                                    label="Location"
                                >
                                    {locations?.map((city) => (
                                        <MenuItem
                                            key={city.city}
                                            value={city.city}
                                        >
                                            {city.city}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <DatePicker
                                label="Start Date"
                                value={selectedStartDate}
                                onChange={(value) =>
                                    setSelectedStartDate(value)
                                }
                            />
                            <DatePicker
                                label="End Date"
                                value={selectedEndDate}
                                onChange={(value) => setSelectedEndDate(value)}
                            />
                        </div>
                    </div>
                    <div className="ml-4 basis-1/12 mt-4 lg:mt-0">
                        <Button
                            variant="contained"
                            color="primary"
                            className="w-full h-full"
                            onClick={onSearch}
                        >
                            Search
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchSection;
