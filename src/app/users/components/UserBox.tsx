"use client";
import { useCallback, useState } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Avatar from "@/app/components/Avatar";

type Props = {
    data: User;
};

const UserBox: React.FC<Props> = ({ data }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleClick = useCallback(() => {
        setLoading(true);

        axios
            .post("/api/conversations", { useId: data.id })
            .then((data) => {
                router.push(`/conversations/${data.data.id}`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [data, router]);
    return (
        <div
            onClick={handleClick}
            className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
        >
            <Avatar user={data} />
        </div>
    );
};

export default UserBox;
