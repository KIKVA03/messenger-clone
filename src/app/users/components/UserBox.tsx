"use client";
import { useCallback, useState } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";

type Props = {
    data: User;
};

const UserBox: React.FC<Props> = ({ data }) => {
    const router = useRouter();
    const [loading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);

        axios
            .post("/api/conversations", { userId: data.id })
            .then((data) => {
                router.push(`/conversations/${data.data.id}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [data, router]);

    return (
        <>
            {loading && <LoadingModal />}

            <div
                onClick={handleClick}
                className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
            >
                <Avatar user={data} />
                <div className="min-w-0 flex-1">
                    <div className="focus:outline-none ">
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-xm font-medium text-gray-900 ">{data.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserBox;
