import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../config/axios";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";

const UploadPhotoPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("avatar", file);

        setIsLoading(true);
        try {
            const data = await api.post("/users/upload-avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success(data.data.message);

            navigate("/dashboard");
        } catch (err) {
            toast.error(`${err}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-[#F4F9FD]">
            <h2 className="text-2xl font-semibold mb-6">
                Upload your profile photo
            </h2>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4 border p-5"
            />

            <Button
                variant="medium"
                onClick={handleUpload}
                disabled={!file || isLoading}
                className="flex items-center gap-2"
            >
                {isLoading ? (
                    <div className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    <>Upload</>
                )}
            </Button>
        </section>
    );
};

export default UploadPhotoPage;
