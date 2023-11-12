"use client";
import { useCallback, useMemo } from "react";
import useRouter from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import format from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";

interface Props {
    data: FullConversationType;
    selected?: boolean;
}

const ConversationBox: React.FC<Props> = ({ data, selected }) => {
    return <div>ConversationBox</div>;
};

export default ConversationBox;
