import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import ProgressStepAuth from "../components/ui/progress-step-auth";
import useStepProgressAuth from "../hooks/useStepProgressAuth";
import Step1 from "../components/steps/step-1";
import Step2 from "../components/steps/step-2";
import Step3 from "../components/steps/step-3";
import Step4 from "../components/steps/step-4";
const SignUpPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [nextStep, setNextStep] = useState<boolean>(false);
    const totalStep = 4;
    const { progressData, setProgressData } = useStepProgressAuth();
    const handleSavePreviusStep = () => {
        const findStep = progressData.find(
            (step) => step.step === currentStep - 1
        );
        findStep!.isSuccess = true;
        setProgressData([...progressData]);
    };
    const incrementCurrentStep = () => {
        if (currentStep < 4) {
            setCurrentStep((prevState) => prevState + 1);
        }
    };
    useEffect(() => {
        if (currentStep !== 1) {
            handleSavePreviusStep();
        }
    }, [currentStep]);
    const getCurrentStep = () => {
        switch (currentStep) {
            case 1: {
                return <Step1 setNextStep={setNextStep} />;
            }
            case 2: {
                return <Step2 />;
            }
            case 3: {
                return <Step3 />;
            }
            case 4: {
                return <Step4 />;
            }
        }
    };
    return (
        <section className="h-screen p-[20px_35px_30px_35px] bg-[#F4F9FD]">
            <div className="flex h-full gap-x-8">
                <div className="bg-[#3F8CFF] w-[100%] pt-[60px] rounded-[24px] max-w-[25%] pl-[40px]">
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
                <div className="w-[100%] flex flex-col justify-between max-w-[70%] rounded-[24px]  bg-white shadow-[0px_6px_rgba(196_203_214_0.5)]">
                    <div className="flex flex-col max-w-[403px] w-full mx-auto items-center pt-[55px]">
                        <span className="font-bold text-[14px] text-[#3F8CFF]">
                            Step {currentStep}/{totalStep}
                        </span>
                        <h2 className="signin-title">
                            {progressData[currentStep - 1].title}
                        </h2>
                        <form
                            onSubmit={(event) => event.preventDefault()}
                            className="flex w-full flex-col gap-y-[15px] mt-[33px]"
                        >
                            {getCurrentStep()}
                        </form>
                    </div>
                    <div className="border-t-2 border-[#E4E6E8] pt-[10px] pb-[10px]">
                        <Button
                            variant="small"
                            disabled={!nextStep}
                            onClick={incrementCurrentStep}
                            className={`flex ml-auto mr-10 items-center text-sm gap-x-3 ${
                                !nextStep
                                    ? " !bg-gray-500 !cursor-not-allowed px-5 py-2.5 opacity-70"
                                    : ""
                            }`}
                        >
                            Next Step
                            <Icon.rightArrowIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUpPage;
