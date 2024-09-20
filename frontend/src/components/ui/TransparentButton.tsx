// author: Smit Patel
import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

const StyledButton = styled(Button)`
    color: white;
    background: transparent;
    border: 1px solid white;
    &:hover {
        color: black;
        background: white;
    }
`;

interface TransparentButtonProps extends ButtonProps {
    to: string;
    onClick?: () => void;
}
const TransparentButton: React.FC<TransparentButtonProps> = (props) => {
    const { to, onClick,  ...buttonProps } = props;
    return <StyledButton component={Link} size="large" disableElevation {...props} onClick={onClick} />;
};

export default TransparentButton;
