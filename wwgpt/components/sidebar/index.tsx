import { NewChatButton } from "./new-chat-button";

export const Siderbar = () => {
    return(
        <div className="h-full lg:flex lg;flex-col lg:w-[300px] bg-neutral-950 p-4">
            <NewChatButton />
            ChatList
            UpgradePlanButton
        </div>
    );
};
