import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../../config/axios";
import Input from "../ui/Input";
import Button2 from "../ui/Button2";
import { toast } from "react-toastify";
import Loader from "../ui/Loader";
import Select from "../ui/Select";
import { useAuthStore } from "../../store/authStore";

interface Option {
    id: string;
    question_id: string;
    option_text: string;
    option_value: string;
}

interface Question {
    id: string;
    question_text: string;
    question_type: "text" | "select" | "radio" | "checkbox" | "button";
    is_required: boolean;
    step_number: number;
    options: Option[];
}

interface Step3Props {
    setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
}

const fetchQuestions = async () => {
    const { data } = await api.get("admin/questions?step_number=3");
    return data as Question[];
};

interface AnswerValue {
    answer_text: string;
    option_ids?: string[];
}

const Step3: React.FC<Step3Props> = ({ setNextStep }) => {
    const {
        data: questions = [],
        isLoading,
        error,
    } = useQuery<Question[], Error>({
        queryKey: ["questions", 3],
        queryFn: fetchQuestions,
    });

    const answers = useAuthStore(
        (state) => state.step3 as Record<string, AnswerValue>
    );
    const setStep3 = useAuthStore((state) => state.setStep3);

    const [activeIndexMap, setActiveIndexMap] = useState<
        Record<string, number>
    >({});

    useEffect(() => {
        const allRequiredAnswered = questions.every(
            (q) => !q.is_required || !!answers[q.id]?.answer_text
        );
        setNextStep(allRequiredAnswered);
    }, [answers, questions, setNextStep]);

    const handleInputChange = (questionId: string, value: string) => {
        setStep3({
            ...answers,
            [questionId]: { answer_text: value },
        });
    };

    const handleButtonClick = (
        questionId: string,
        option_value: string,
        option_id: string,
        index: number
    ) => {
        setStep3({
            ...answers,
            [questionId]: {
                answer_text: option_value,
                option_ids: [option_id],
            },
        });
        setActiveIndexMap((prev) => ({
            ...prev,
            [questionId]: index,
        }));
    };

    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Loader />
            </div>
        );
    }

    if (error) {
        toast.error(error.message);
        return null;
    }

    return (
        <div className="w-full flex flex-col gap-5">
            {questions.map((question) => {
                const value = answers[question.id]?.answer_text || "";

                switch (question.question_type) {
                    case "text":
                        return (
                            <Input
                                key={question.id}
                                label={question.question_text}
                                placeholder={
                                    question.options[0]?.option_text || ""
                                }
                                required={question.is_required}
                                type="text"
                                value={value}
                                onChange={(e) =>
                                    handleInputChange(
                                        question.id,
                                        e.target.value
                                    )
                                }
                                inputClassName="w-full"
                            />
                        );

                    case "select":
                        return (
                            <div
                                key={question.id}
                                className="flex flex-col gap-2"
                            >
                                <label className="font-bold text-[#7D8592]">
                                    {question.question_text}
                                </label>
                                <Select
                                    value={
                                        answers[question.id]?.answer_text
                                            ? answers[question.id].answer_text
                                            : question.options.length > 0
                                            ? question.options[0].option_value
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const selectedOption =
                                            question.options.find(
                                                (opt) =>
                                                    opt.option_value ===
                                                    e.target.value
                                            );
                                        if (selectedOption) {
                                            setStep3({
                                                ...answers,
                                                [question.id]: {
                                                    answer_text:
                                                        selectedOption.option_text,
                                                    option_ids: [
                                                        selectedOption.id,
                                                    ],
                                                },
                                            });
                                        }
                                    }}
                                    required={question.is_required}
                                    options={question.options.map((o) => ({
                                        value: o.option_value,
                                        label: o.option_text,
                                    }))}
                                />
                            </div>
                        );

                    case "button":
                        return (
                            <div
                                key={question.id}
                                className="flex flex-col gap-2"
                            >
                                <label className="input-label text-[#7D8592] font-bold text-[14px]">
                                    {question.question_text}
                                </label>
                                <div className="w-full grid grid-cols-4 gap-3">
                                    {[...question.options]
                                        .sort((a, b) => {
                                            const parse = (s: string) =>
                                                parseInt(
                                                    s.match(/\d+/)?.[0] || "0",
                                                    10
                                                );
                                            return (
                                                parse(a.option_text) -
                                                parse(b.option_text)
                                            );
                                        })
                                        .map((option, index) => (
                                            <Button2
                                                key={option.id}
                                                onClick={() =>
                                                    handleButtonClick(
                                                        question.id,
                                                        option.option_value,
                                                        option.id,
                                                        index
                                                    )
                                                }
                                                buttonClassName={
                                                    activeIndexMap[
                                                        question.id
                                                    ] === index
                                                        ? "!bg-blue-500 !text-white"
                                                        : ""
                                                }
                                            >
                                                {option.option_text}
                                            </Button2>
                                        ))}
                                </div>
                            </div>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default Step3;
