import "../../assets/styles/button.css";
import React, { type HTMLAttributes } from "react";
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const PreviousButton = ({ children, ...props }: ButtonProps) => {
    return <button {...props}>{children}</button>;
};

export default PreviousButton;
