// author: Smit Patel
import { debounce, Slider } from "@mui/material";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface FilterSliderProps {
    min: number;
    max: number;
    selectedMin: number | null;
    selectedMax: number | null;
}

function valuetext(value: number) {
    return `$${value}`;
}

const FilterSlider: React.FC<FilterSliderProps> = (props) => {
    const selectedPriceRange = [props.selectedMin || props.min, props.selectedMax || props.max];
    const [priceRange, setPriceRange] = useState<number[]>(selectedPriceRange);
    const search = useLocation().search;
    const navigate = useNavigate();

    const priceRangeChange = (priceRange: number[]) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set("minPrice", priceRange[0].toString());
        searchParams.set("maxPrice", priceRange[1].toString());
        searchParams.delete("page");
        navigate({ search: searchParams.toString() }, { replace: true });
    };

    const debouncedPriceRangeChange = useRef(
        debounce(priceRangeChange, 300)
    ).current;

    const handleChange = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
        debouncedPriceRangeChange(newValue as number[]);
    };

    return (
        <>
            <div>
                {valuetext(priceRange[0])} - {valuetext(priceRange[1])}
            </div>
            <Slider
                key={props.min + props.max}
                getAriaLabel={() => "Price range"}
                value={priceRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={props.min}
                max={props.max}
            />
        </>
    );
};

export default FilterSlider;
