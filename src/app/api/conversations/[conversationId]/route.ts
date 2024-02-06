import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    conversationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    try {
        const { conversationId } = params;

        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorised", { status: 401 });
        }

        // Fetch the conversation and include its users to check for current user's participation
        const existingConversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
            include: {
                users: true, // Assuming 'users' is the correct relation field
            },
        });

        if (!existingConversation) {
            return new NextResponse("Invalid ID", { status: 400 });
        }

        // Check if current user is part of the conversation's users
        const isUserPartOfConversation = existingConversation.users.some(
            (user) => user.id === currentUser.id
        );

        if (!isUserPartOfConversation) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // Proceed to delete the conversation if user is part of it
        const deletedConversation = await prisma.conversation.delete({
            where: {
                id: conversationId,
            },
        });

        return NextResponse.json(deletedConversation);
    } catch (error: any) {
        console.log(error, "ERROR_CONVERSATION_DELETE");
        return new NextResponse("Internal Error", { status: 500 });
    }
}
