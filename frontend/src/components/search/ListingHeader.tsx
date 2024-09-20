// author: Smit Patel
import { Button, Divider, Menu, MenuItem, Skeleton } from "@mui/material";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ListingHeaderProps {
    toggleDrawer: any;
    selectedCityName: string;
    selectedCityTourCount: number;
    selectedSortBy: string | null;
    selectedSortOrder: string | null;
    isLoading: boolean;
}

const ListingHeader: React.FC<ListingHeaderProps> = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigagte = useNavigate();
    const search = useLocation().search;
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSort = (sortBy: string, sortOrder: string) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set("sortBy", sortBy);
        searchParams.set("sortOrder", sortOrder);
        handleClose();
        navigagte({ search: searchParams.toString() });
    };
    return (
        <>
            <div className="mt-2 flex flex-wrap justify-between items-center mb-8">
                {props.isLoading && (
                        <Skeleton variant="text" sx={{
                            width: 150
                        }}/>
                )}
                {!props.isLoading && (
                    <div className="text-lg mr-4">
                        <span className="font-medium">
                            {props.selectedCityTourCount + " "} tours
                        </span>{" "}
                        in
                        {" " + props.selectedCityName}
                    </div>
                )}
                <div className="flex gap-1 flex-wrap">
                    <div className="xl:hidden">
                        <Button
                            variant="outlined"
                            onClick={() => props.toggleDrawer(true)}
                        >
                            <FilterAltOutlinedIcon />
                            <span className="ml-1">Filter</span>
                        </Button>
                    </div>
                    <Button
                        variant="outlined"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                    >
                        <SwapVertOutlinedIcon />
                        <span className="ml-1">
                            Sort
                            {props.selectedSortBy &&
                                `: ${props.selectedSortBy}`}{" "}
                            {props.selectedSortOrder &&
                                `- ${props.selectedSortOrder}`}
                        </span>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={() => handleSort("price", "asc")}>
                            Price: Low to High
                        </MenuItem>
                        <MenuItem onClick={() => handleSort("price", "desc")}>
                            Price: High to Low
                        </MenuItem>
                        <MenuItem onClick={() => handleSort("name", "asc")}>
                            Name: ascending
                        </MenuItem>
                        <MenuItem onClick={() => handleSort("name", "desc")}>
                            Name: descending
                        </MenuItem>
                    </Menu>
                </div>
            </div>
            <Divider />
        </>
    );
};

export default ListingHeader;
