import getCurentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    conversationId: string;
}
export async function POST(request: Request, { params }: { params: IParams }) {
    try {
        const currentUser = await getCurentUser();
        const { conversationId } = params;

        if (!currentUser?.email || !currentUser?.id) {
            return new NextResponse("Unouthorized", { status: 404 });
        }

        // Firnd the existing converstion
        const conversation = await prisma?.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                messages: {
                    include: { seen: true },
                },
                users: true,
            },
        });

        if (!conversation) {
            return new NextResponse("Invalid ID", { status: 400 });
        }
        //Find last mesage
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        if (!lastMessage) {
            return NextResponse.json(conversation);
        }
        //update seen of last message
        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id,
            },
            include: {
                sender: true,
                seen: true,
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
        });
        return NextResponse.json(updatedMessage);
    } catch (error: any) {
        console.log(error, "ERROR_MESSAGES_SEEN");
        return new NextResponse("Internal Erro", { status: 500 });
    }
}
