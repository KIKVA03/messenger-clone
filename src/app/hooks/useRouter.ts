import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

const useRouter = () => {
    const pathName = usePathname();
    const { conversationId } = useConversation();

    const routes = useMemo(
        () => [
            {
                label: "Chat",
                href: "/conversation",
                icon: HiChat,
                active: pathName === "/conversation" || !!conversationId,
            },
            {
                label: "Users",
                href: "/users",
                icon: HiUsers,
                active: pathName === "/users",
            },
            {
                label: "Logout",
                href: "#",
                onClick: () => signOut(),

                icon: HiArrowLeftOnRectangle,
            },
        ],
        [pathName, conversationId]
    );
    return routes;
};

export default useRouter;
