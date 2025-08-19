import { type SelectHTMLAttributes } from "react";
import "../../assets/styles/input.css";
import Icon from "./Icon";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
    selectClassName?: string;
    error?: string;
}

const Select = ({
    options,
    selectClassName = "",
    error,
    ...props
}: SelectProps) => {
    return (
        <div className="flex flex-col gap-2 text-[#7D8592]">
            <div className="relative">
                <select
                    className={`w-full appearance-none pr-10 py-[9.5px] px-3 border border-[#D8E0F0] outline-none rounded-[14px] active:rounded-[14px_14px_0_0] active:border-gray-500 active:border-b-transparent ${selectClassName}`}
                    {...props}
                >
                    <option value="" disabled hidden>
                        -- Select --
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <Icon.bottomArrowIcon />
                </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Select;
