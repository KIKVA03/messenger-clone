"use client";

import { signOut, useSession } from "next-auth/react";
import EmptyState from "../(site)/components/EmptyState";

const Users = () => {
    const session = useSession();

    console.log("session1 ", session);
    return (
        <div className={`hidden lg:block lg:pl-80 h-full `}>
            <EmptyState />
        </div>
    );
};

export default Users;
