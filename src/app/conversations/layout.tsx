import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function conversationsLayout({ children }: { children: React.ReactNode }) {
    const conversation = await getConversations();
    const users = await getUsers();

    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList initialItems={conversation} users={users} />
                {children}
            </div>
        </Sidebar>
    );
}
