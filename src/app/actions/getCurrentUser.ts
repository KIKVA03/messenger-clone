import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getCurentUser = async () => {
    try {
        const session = await getSession();
        if (!session?.user?.email) {
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            },
        });
        if (!currentUser) {
        }
    } catch (err) {
        return null;
    }
};

export default getCurentUser;
