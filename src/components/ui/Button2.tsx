import "../../assets/styles/button.css";
import React, { type HTMLAttributes } from "react";
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    buttonClassName: string;
}

const Button2 = ({ children, buttonClassName, ...props }: ButtonProps) => {
    return (
        <button className={`btn2 cursor-pointer ${buttonClassName}`} {...props}>
            {children}
        </button>
    );
};

export default Button2;
