import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/input/Input";
import Select from "@/app/components/input/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
    isOpen?: boolean;
    onClose: () => void;
    users: User[];
};

const GroupChatModal = ({ onClose, isOpen, users }: Props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            members: [],
        },
    });

    const members = watch("members");

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios
            .post("/api/conversations", { ...data, isGroup: true })
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => {
                toast.error("Something went wrong");
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gary-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Create A group chat
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            reate a chat with more than 2 people.
                        </p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                errors={errors}
                                register={register}
                                disabled={isLoading}
                                required
                                id="name"
                                label="name"
                            />
                            <Select
                                disabled={isLoading}
                                label="Members"
                                options={users.map((user) => ({
                                    value: user.id,
                                    label: user.name,
                                }))}
                                onChange={(value) =>
                                    setValue("members", value, {
                                        shouldValidate: true,
                                    })
                                }
                                value={members}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button secondary disabled={isLoading} onClick={onClose} type="button">
                        Cancel
                    </Button>
                    <Button disabled={isLoading} type="submit">
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default GroupChatModal;
