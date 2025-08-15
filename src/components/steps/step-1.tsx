import { useEffect, useRef, useState } from "react";
import "../../assets/styles/input.css";
import useSendOtp from "../../hooks/requests/useSendOtp";
import Input from "../ui/Input";
import InputMask from "../ui/input-mask";
import OtpInput from "../ui/otp-input";
import { toast } from "react-toastify";
import CodeTimer from "../code-timer";
import type { AxiosError } from "axios";

const Step1 = ({ setNextStep }: { setNextStep: (val: boolean) => void }) => {
    const [canSendOtp, setCanSendOtp] = useState<boolean>(true);
    const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);

    const {
        mutateAsync,
        isSuccess: sendOtpSuccess,
        isError,
        error,
        isPending,
    } = useSendOtp();

    const ref = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [phoneNumber, setPhoneNumber] = useState<string>("+998950086735");

    const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateForm = () => {
        let isValid = true;

        if (!email) {
            setEmailError("Email is required.");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError("Password is required.");
            isValid = false;
        } else if (!strongPasswordRegex.test(password)) {
            setPasswordError(
                "Password must be 8+ chars, include upper/lowercase, number, and special character."
            );
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (!canSendOtp && !isOtpVerified) {
            isValid = false;
        }

        return isValid;
    };

    useEffect(() => {
        const isFormValid = validateForm();
        setNextStep(isFormValid);
    }, [email, password, canSendOtp, isOtpVerified, setNextStep]);

    const handleClick = () => {
        const phoneNumber = ref.current?.value;

        setPhoneNumber(phoneNumber as string);
        mutateAsync(phoneNumber as string);
    };

    useEffect(() => {
        if (sendOtpSuccess) {
            toast.success("SMS code sent");
            setCanSendOtp(false);
        }
    }, [sendOtpSuccess]);

    useEffect(() => {
        if (isError) {
            const err = error as AxiosError<{ message: string }>;
            const message = err.response?.data?.message;
            toast.error(message);
        }
    }, [isError, error]);

    return (
        <>
            <InputMask
                handleClick={handleClick}
                isLoading={isPending}
                sendOtpSuccess={!canSendOtp}
                inputRef={ref}
                label="Mobile Number"
            />

            {!canSendOtp && (
                <>
                    <OtpInput
                        setCanSendOtp={setCanSendOtp}
                        phone_number={phoneNumber}
                        label="Code from SMS"
                        setIsOtpVerified={setIsOtpVerified}
                    />
                    <CodeTimer
                        setCanSendOtp={setCanSendOtp}
                        phone_number={phoneNumber}
                        time={59}
                    />
                </>
            )}

            <Input
                inputClassName="w-full"
                type="email"
                label="Email Address"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
            />

            <Input
                inputClassName="w-full"
                label="Create Password"
                type="password"
                placeholder="••••••••"
                eyeIcon
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
            />
        </>
    );
};

export default Step1;
