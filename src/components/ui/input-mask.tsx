import { IMaskInput } from "react-imask";
import Button from "./Button";
import Loader from "./Loader";

interface Props {
    label: string;
    inputRef: React.MutableRefObject<any>;
    handleClick: () => void;
    sendOtpSuccess: boolean;
    isLoading?: boolean;
}

const InputMask = ({
    label,
    sendOtpSuccess,
    inputRef,
    handleClick,
    isLoading,
}: Props) => {
    return (
        <>
            <div className="flex flex-col gap-y-2">
                <label className="input-label">{label}</label>
                <div className="flex w-full gap-x-1.5">
                    <IMaskInput
                        inputRef={inputRef}
                        className="input w-full"
                        mask="{+998} 00 000 00 00"
                        defaultValue="+998"
                        unmask="+998000000000"
                        inputMode="tel"
                        minLength={17}
                    />
                    <Button
                        onClick={handleClick}
                        itemType="button"
                        disabled={sendOtpSuccess}
                        variant="small"
                        className={`flex !py-[5px] text-sm ${
                            sendOtpSuccess &&
                            ` !bg-gray-500 !cursor-not-allowed opacity-70`
                        } items-center gap-x-3`}
                    >
                        {isLoading ? <Loader /> : "Send"}
                    </Button>
                </div>
            </div>
        </>
    );
};
export default InputMask;
