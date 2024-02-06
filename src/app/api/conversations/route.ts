import getCurentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurentUser();

        const body = await request.json();

        const { userId, isGroup, members, name } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorised", { status: 401 });
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse("invalid data", { status: 400 });
        }
        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        // aq es connect rodesac sheikmneba bgazasho prismis meshveobit conversation group iq daamatebs current users kvemot mititebuli objectis meshveobit
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value,
                            })),
                            {
                                id: currentUser.id,
                            },
                        ],
                    },
                },
                // marto idebs daaabrunebs am includes meshveobit potos da sxva fieldebis gareshe

                include: {
                    users: true,
                },
            });
            return NextResponse.json(newConversation);
        }

        const existingConvrsations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId],
                        },
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id],
                        },
                    },
                ],
            },
        });

        const singleConversation = existingConvrsations[0];
        if (singleConversation) {
            return NextResponse.json(singleConversation);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [{ id: currentUser.id }, { id: userId }],
                },
            },
            include: {
                users: true,
            },
        });
        return NextResponse.json(newConversation);
    } catch (error: any) {
        console.error(error);
        return new NextResponse("inernal Error", { status: 500 });
    }
}
