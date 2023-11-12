import getConversations from "../actions/getConversations";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function conversationsLayout({ children }: { children: React.ReactNode }) {
    const conversation = await getConversations();
    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList initialItems={conversation} />
                {children}
            </div>
        </Sidebar>
    );
}
