import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../../config/axios";
import { useAuthStore } from "../../store/authStore";
import Icon from "../ui/Icon";
import Input from "../ui/Input";
import Loader from "../ui/Loader";

interface Option {
    id: string;
    question_id: string;
    option_text: string;
    option_value: string;
}

interface Question {
    id: string;
    question_text: string;
    question_type: "text";
    is_required: boolean;
    step_number: number;
    options: Option[];
}

interface Step4Props {
    setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
    setStep4QuestionId: React.Dispatch<React.SetStateAction<string>>;
}

const fetchQuestions = async () => {
    const { data } = await api.get<Question[]>("admin/questions?step_number=4");
    return data;
};

const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email.trim());

const Step4 = ({ setNextStep, setStep4QuestionId }: Step4Props) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["questions", 4],
        queryFn: fetchQuestions,
    });

    const question = data?.[0];

    const emails = useAuthStore((state) => state.step4);
    const setStep4 = useAuthStore((state) => state.setStep4);

    const handleEmailChange = (index: number, value: string) => {
        const updated = [...emails];
        updated[index] = value;
        setStep4(updated);
    };

    const handleAddInput = () => {
        setStep4([...emails, ""]);
    };

    const handleRemoveInput = (index: number) => {
        const updated = emails.filter((_, i) => i !== index);
        setStep4(updated);
    };

    useEffect(() => {
        if (question?.id) {
            setStep4QuestionId(question.id);
            setStep4([]);
        }
    }, [question?.id, setStep4QuestionId, setStep4]);

    useEffect(() => {
        const allValid =
            emails.length > 0 &&
            emails.every(
                (email) =>
                    !question?.is_required ||
                    (email.trim() !== "" && isValidEmail(email))
            );
        setNextStep(allValid);
    }, [emails, question, setNextStep]);

    if (isLoading)
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Loader />
            </div>
        );

    if (error || !question) {
        toast.error(error?.message || "Failed to load question");
        return null;
    }

    return (
        <>
            <div className="w-full flex flex-col gap- 5 max-h-[450px] overflow-y-auto">
                {emails.map((email, index) => (
                    <div key={index} className="flex items-end gap-2">
                        <Input
                            label={`${question.question_text} ${
                                emails.length > 1 ? index + 1 : ""
                            }`}
                            type="text"
                            inputClassName="w-full"
                            placeholder={question.options[0]?.option_text ?? ""}
                            value={email}
                            onChange={(e) =>
                                handleEmailChange(index, e.target.value)
                            }
                        />
                        <button
                            className="py-[13px]"
                            onClick={() => handleRemoveInput(index)}
                        >
                            <Icon.closeIcon />
                        </button>
                    </div>
                ))}
            </div>
            <button
                type="button"
                className="text-base text-[#3F8CFF] flex gap-2 items-center mt-3"
                onClick={handleAddInput}
            >
                <Icon.plusIcon /> Add another Member
            </button>
        </>
    );
};

export default Step4;
