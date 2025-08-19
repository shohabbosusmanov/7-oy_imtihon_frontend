import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import Illustration from "../assets/images/Illustration.svg";
import "../assets/styles/sign-up.css";

import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Input from "../components/ui/Input";

import { api } from "../config/axios";

const SignInPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.post("auth/login", { email, password });

            if (data.access_token) {
                toast.success("Successfully signed in!");
                navigate("/");
                data;
            } else {
                throw new Error("invalid access token ");
            }
        } catch (error: any) {
            console.error("Login error response:", error.response);
            const message = error.response?.data?.message;
            toast.error(
                Array.isArray(message)
                    ? message.join(", ")
                    : message || error.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="h-screen p-[20px_35px_30px_35px] bg-[#F4F9FD]">
            <div className="flex rounded-[24px] overflow-hidden h-full">
                <div className="bg-[#3F8CFF] w-[100%] max-w-[50%] pl-[84px]">
                    <div className="flex flex-col h-full justify-around items-start">
                        <div className="flex items-center mt-4 text-white gap-x-8">
                            <Icon.companyLogo />
                            <span className="brand-title">Woorkroom</span>
                        </div>
                        <p className="description text-white text-[40px] max-w-[400px]">
                            Your place to work Plan. Create. Control.
                        </p>
                        <img
                            width={500}
                            height={373}
                            src={Illustration}
                            alt="Illustration"
                        />
                    </div>
                </div>
                <div className="w-[100%] max-w-[50%] bg-white shadow-[0px_6px_rgba(196_203_214_0.5)]">
                    <div className="flex flex-col max-w-[403px] mx-auto items-center pt-[115px]">
                        <h2 className="signin-title">Sign In to Woorkroom</h2>
                        <form className="w-full flex flex-col gap-y-[31px] mt-[33px]">
                            <Input
                                inputClassName="w-full"
                                type="email"
                                label="Email Address"
                                placeholder="youremail@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                inputClassName="w-full"
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                eyeIcon={true}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="flex justify-between">
                                <div className="flex gap-x-2">
                                    <input id="save-me" type="checkbox" />
                                    <label
                                        htmlFor="save-me"
                                        className="font-medium text-[16px] text-[rgb(125_133_146)]"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <span className="font-medium text-[16px] text-[rgb(125_133_146)] cursor-pointer">
                                    Forgot Password?
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-y-[20px]">
                                <Button
                                    onClick={handleSubmit}
                                    variant="medium"
                                    className="flex items-center gap-x-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Sign In <Icon.rightArrowIcon />
                                        </>
                                    )}
                                </Button>
                                <Link
                                    to={"/sign-up"}
                                    className="font-semibold text-[16px] text-[#3F8CFF]"
                                >
                                    Don’t have an account?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignInPage;
