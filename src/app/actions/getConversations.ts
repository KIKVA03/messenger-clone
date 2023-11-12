import prisma from "@/app/libs/prismadb";
import getCurentUser from "./getCurrentUser";

const getConversations = async () => {
    const curentUser = await getCurentUser();
    if (!curentUser) {
        return [];
    }

    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                //bolo message
                lastMessageAt: "desc",
            },
            where: {
                userIds: {
                    has: curentUser.id,
                },
            },

            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true,
                    },
                },
            },
        });
        return conversations;
    } catch (error: any) {
        return [];
    }
};

export default getConversations;
