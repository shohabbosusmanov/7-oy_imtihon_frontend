import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import ProgressStepAuth from "../components/ui/progress-step-auth";
import Step1 from "../components/steps/step-1";
import Step2 from "../components/steps/step-2";
import Step3 from "../components/steps/step-3";
import Step4 from "../components/steps/step-4";
import Illustration2 from "../assets/images/Illustration2.svg";

import useStepProgressAuth from "../hooks/useStepProgressAuth";
import { useAuthStore } from "../store/authStore";
import { api } from "../config/axios";

const SignUpPage = () => {
    const navigate = useNavigate();

    const totalStep = 4;
    const [currentStep, setCurrentStep] = useState(1);
    const [nextStep, setNextStep] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [step4QuestionId, setStep4QuestionId] = useState("");

    const { progressData, setProgressData } = useStepProgressAuth();

    const incrementStep = () => {
        if (currentStep < totalStep) {
            setCurrentStep((prev) => prev + 1);
            setNextStep(false);
        }
    };

    const decrementStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
            setNextStep(true);
        }
    };

    const handleSavePreviousStep = useCallback(() => {
        setProgressData((prevData) =>
            prevData.map((step) =>
                step.step === currentStep - 1
                    ? { ...step, isSuccess: true }
                    : step
            )
        );
    }, [currentStep, setProgressData]);

    useEffect(() => {
        if (currentStep !== 1) {
            handleSavePreviousStep();
        }
    }, [currentStep, handleSavePreviousStep]);

    const handleFinish = () => {
        navigate("/");
    };

    const checkEmailPhoneUnique = async (
        email: string,
        phoneNumber: string
    ) => {
        try {
            const res = await api.post("auth/check-user", {
                email,
                phone_number: phoneNumber,
            });

            return res.data.isUnique;
        } catch (error) {
            return false;
        }
    };

    const getCurrentStepComponent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1
                        setNextStep={setNextStep}
                        checkUnique={checkEmailPhoneUnique}
                    />
                );
            case 2:
                return <Step2 setNextStep={setNextStep} />;
            case 3:
                return <Step3 setNextStep={setNextStep} />;
            case 4:
                return (
                    <Step4
                        setNextStep={setNextStep}
                        setStep4QuestionId={setStep4QuestionId}
                    />
                );
            default:
                return null;
        }
    };

    const handleSubmit = async () => {
        const { step1, step2, step3, step4, reset } = useAuthStore.getState();

        const formatAnswer = (question_id: string, answer: any) => {
            if (typeof answer === "string") {
                return {
                    question_id,
                    answer_text: answer,
                    option_ids: [],
                };
            }
            return {
                question_id,
                answer_text: answer.answer_text,
                option_ids: answer.option_ids || [],
            };
        };

        const answers = [
            ...Object.entries(step2).map(([question_id, answer]) =>
                formatAnswer(question_id, answer)
            ),
            ...Object.entries(step3).map(([question_id, answer]) =>
                formatAnswer(question_id, answer)
            ),
        ];

        const teamAnswers = step4.map((email: string) => ({
            question_id: step4QuestionId,
            answer_text: email,
            option_ids: [],
        }));

        const deduplicatedAnswers = Array.from(
            new Map(
                [...answers, ...teamAnswers].map((a) => [a.question_id, a])
            ).values()
        );

        const payload = {
            full_name: step1.full_name,
            email: step1.email,
            phone_number: step1.phoneNumber,
            password: step1.password,
            answers: deduplicatedAnswers,
        };

        setIsLoading(true);

        try {
            await api.post("auth/register", payload);
            reset();
            setIsSuccess(true);
        } catch (error: any) {
            const message =
                error.response?.data?.message || "Registration failed.";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="h-screen p-[20px_35px_30px_35px] bg-[#F4F9FD]">
            {!isSuccess ? (
                <div className="flex h-full gap-x-8">
                    <div className="bg-[#3F8CFF] w-full pt-[60px] rounded-[24px] max-w-[25%] pl-[40px]">
                        <div className="flex flex-col gap-y-14 h-full items-start">
                            <div className="mt-4 text-white gap-x-8">
                                <Icon.companyLogo />
                            </div>
                            <p className="description text-white text-[40px] max-w-[400px]">
                                Get started
                            </p>
                            <ProgressStepAuth
                                steps={progressData}
                                currentStep={currentStep}
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-col justify-between max-w-[75%] rounded-[24px] bg-white shadow-[0px_6px_rgba(196_203_214_0.5)]">
                        <div className="flex flex-col max-w-[403px] w-full mx-auto items-center pt-[55px]">
                            <span className="font-bold text-[14px] text-[#3F8CFF]">
                                Step {currentStep}/{totalStep}
                            </span>
                            <h2 className="signin-title">
                                {progressData[currentStep - 1]?.title}
                            </h2>

                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="flex w-full flex-col gap-y-[15px] mt-[33px]"
                            >
                                {getCurrentStepComponent()}
                            </form>
                        </div>

                        <div className="border-t-2 border-[#E4E6E8] flex p-4 items-center justify-between">
                            {currentStep > 1 ? (
                                <button
                                    onClick={decrementStep}
                                    className="p-btn ml-10 cursor-pointer h-fit flex gap-2 items-center"
                                    type="button"
                                >
                                    <Icon.leftArrowIcon />
                                    Previous
                                </button>
                            ) : (
                                <div />
                            )}

                            <Button
                                variant="small"
                                disabled={!nextStep || isLoading}
                                onClick={
                                    currentStep === totalStep
                                        ? handleSubmit
                                        : incrementStep
                                }
                                className={`flex ml-auto mr-10 items-center text-sm gap-x-3 ${
                                    !nextStep
                                        ? "!bg-gray-500 !cursor-not-allowed px-5 py-2.5 opacity-70"
                                        : ""
                                }`}
                            >
                                {isLoading ? (
                                    <div className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {currentStep === totalStep
                                            ? "Submit"
                                            : "Next Step"}
                                        <Icon.rightArrowIcon />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full pt-[100px] bg-white rounded-[24px]">
                    <img
                        className="w-[500px] h-auto m-auto"
                        src={Illustration2}
                        alt="Illustration"
                    />
                    <h2 className="w-fit m-auto pt-15 pb-6 font-[600] text-[22px]">
                        You are successfully registered!
                    </h2>
                    <Button
                        onClick={handleFinish}
                        className="h-fit flex justify-center items-center gap-2 m-auto"
                        variant="small"
                    >
                        Let's Start <Icon.rightArrowIcon />
                    </Button>
                </div>
            )}
        </section>
    );
};

export default SignUpPage;
