import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../config/axios";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";
import Select from "../ui/Select";
import { useAuthStore } from "../../store/authStore";
import Input from "../ui/Input";

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

interface Step2Props {
    setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
}

const fetchQuestions = async () => {
    const { data } = await api.get("admin/questions?step_number=2");
    return data as Question[];
};

interface AnswerValue {
    answer_text: string;
    option_ids?: string[];
}

const Step2: React.FC<Step2Props> = ({ setNextStep }) => {
    const {
        data: questions = [],
        isLoading,
        error,
    } = useQuery<Question[], Error>({
        queryKey: ["questions", 2],
        queryFn: fetchQuestions,
    });

    const answers = useAuthStore(
        (state) => state.step2 as Record<string, AnswerValue>
    );
    const setStep1 = useAuthStore((state) => state.setStep1);
    const setStep2 = useAuthStore((state) => state.setStep2);

    const [fullName, setFullName] = useState("");
    const [fullNameError, setFullNameError] = useState("");

    useEffect(() => {
        const allRequiredAnswered = questions.every(
            (q) => !q.is_required || !!answers[q.id]?.answer_text
        );

        const fullNameValid = fullName.trim().length > 0;
        setFullNameError(fullNameValid ? "" : "Full name is required.");

        setNextStep(allRequiredAnswered && fullNameValid);
    }, [answers, questions, fullName, setNextStep]);

    const handleChange = (
        questionId: string,
        answer_text: string,
        option_ids: string[] = []
    ) => {
        setStep2({
            ...answers,
            [questionId]: { answer_text, option_ids },
        });
    };

    if (isLoading)
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Loader />
            </div>
        );

    if (error) {
        toast.error(error.message);
        return null;
    }

    return (
        <div
            className="w-full flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
        >
            <Input
                label="Fullname"
                inputClassName=""
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => {
                    const value = e.target.value;
                    setFullName(value);
                    setStep1({ full_name: value });
                }}
                error={fullNameError}
            />
            {questions.map((question) => (
                <div key={question.id} className="flex flex-col gap-2">
                    <label className="font-bold text-[#7D8592]">
                        {question.question_text} {question.is_required && "*"}
                    </label>

                    {question.question_type === "select" && (
                        <Select
                            value={
                                answers[question.id]?.answer_text
                                    ? answers[question.id].answer_text
                                    : question.options.length > 0
                                    ? question.options[0].option_value
                                    : ""
                            }
                            onChange={(e) => {
                                const selectedOption = question.options.find(
                                    (opt) => opt.option_value === e.target.value
                                );
                                if (selectedOption) {
                                    handleChange(
                                        question.id,
                                        selectedOption.option_text,
                                        [selectedOption.id]
                                    );
                                }
                            }}
                            required={question.is_required}
                            options={question.options.map((option) => ({
                                label: option.option_text,
                                value: option.option_value,
                            }))}
                            error={
                                question.is_required &&
                                !answers[question.id]?.answer_text
                                    ? "* required"
                                    : undefined
                            }
                        />
                    )}

                    {question.question_type === "radio" && (
                        <div className="flex gap-6">
                            {question.options.map((option) => (
                                <label
                                    key={option.id}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="radio"
                                        name={question.id}
                                        value={option.option_value}
                                        checked={
                                            answers[question.id]
                                                ?.answer_text ===
                                            option.option_text
                                        }
                                        onChange={() =>
                                            handleChange(
                                                question.id,
                                                option.option_text,
                                                [option.id]
                                            )
                                        }
                                        required={question.is_required}
                                    />
                                    {option.option_text}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Step2;
