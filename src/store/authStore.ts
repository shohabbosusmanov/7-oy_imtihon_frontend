import { create } from "zustand";

type Step1Data = {
    phoneNumber: string;
    full_name: string;
    email: string;
    password: string;
    isOtpVerified: boolean;
};

type Answer = {
    answer_text: string;
    option_ids?: string[];
};

type StepAnswers = Record<string, Answer>;

interface AuthState {
    step1: Step1Data;
    step2: StepAnswers;
    step3: StepAnswers;
    step4: string[];
    setStep1: (data: Partial<Step1Data>) => void;
    setStep2: (data: StepAnswers) => void;
    setStep3: (data: StepAnswers) => void;
    setStep4: (emails: string[]) => void;
    reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    step1: {
        full_name: "",
        phoneNumber: "",
        email: "",
        password: "",
        isOtpVerified: false,
    },
    step2: {},
    step3: {},
    step4: [],
    setStep1: (data: Partial<Step1Data>) =>
        set((state) => ({
            step1: {
                ...state.step1,
                ...data,
            },
        })),
    setStep2: (data) => set({ step2: data }),
    setStep3: (data) => set({ step3: data }),
    setStep4: (emails) => set({ step4: emails }),
    reset: () =>
        set({
            step1: {
                full_name: "",
                phoneNumber: "",
                email: "",
                password: "",
                isOtpVerified: false,
            },
            step2: {},
            step3: {},
            step4: [],
        }),
}));
