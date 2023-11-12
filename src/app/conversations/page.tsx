"use client";
import clsx from "clsx";
import useConversation from "../hooks/useConversation";
import EmptyState from "../(site)/components/EmptyState";

type Props = {};

const Page = (props: Props) => {
    const { isOpen } = useConversation();
    return (
        <div className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}>
            <EmptyState />
        </div>
    );
};

export default Page;
