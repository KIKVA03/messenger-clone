import { useEffect, useState } from "react";
import useActieList from "./useactiveList";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "../libs/pusher";

const useActiveChannel = () => {
    const { add, remove, set } = useActieList();

    const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

    useEffect(() => {
        let channel = activeChannel;
        if (!channel) {
            channel = pusherClient.subscribe("presence-messenger");
            setActiveChannel(channel);
        }

        channel.bind("pusher:subsciption_succeeded", (members: Members) => {
            const initialmembers: string[] = [];

            members.each((member: Record<string, any>) => initialmembers.push(member.id));
            set(initialmembers);
        });

        channel.bind("pusher:member_added", (member: Record<string, any>) => {
            add(member.id);
        });

        channel.bind("pusher:member_removed", (member: Record<string, any>) => {
            remove(member.id);
        });

        return () => {
            if (activeChannel) {
                pusherClient.unsubscribe("presence-messenger");
                setActiveChannel(null);
            }
        };
    }, [activeChannel, set, add, remove]);
};

export default useActiveChannel;
