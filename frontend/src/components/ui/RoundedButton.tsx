// author: Smit Patel
import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";
import React from "react";

const StyledButton = styled(Button)`
    border-radius: 9999px;
    height: 100%;
    text-transform: none;
    font-weight: 700;
`;

const RoundedButton: React.FC<ButtonProps> = (props) => {
    return <StyledButton fullWidth disableElevation {...props} />;
};

export default RoundedButton;
