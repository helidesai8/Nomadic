// author: Smit Patel
import { Checkbox, FormControlLabel } from "@mui/material";
import { useContext } from "react";

const FilterItem: React.FC<any> = (props) => {
    return (
        <li className="flex items-center justify-between -mt-2">
            <div className="flex items-center ">
                <FormControlLabel
                    classes={{
                        label: "text-sm",
                    }}
                    control={
                        <Checkbox
                            size="small"
                            checked={props.checked}
                            value={props.filterId}
                            onChange={(e) => {
                                props.onFilterChange(e.target.value);
                            }}
                        />
                    }
                    label={props.filterName}
                />
            </div>
            {props.count !== 0 && <div className="text-sm text-gray">{props.count}</div>}
        </li>
    );
};

export default FilterItem;
