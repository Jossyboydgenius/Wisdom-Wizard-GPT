"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { Header } from "./_components/header";
import { Body } from "./_components/body";
import { Form } from "./_components/form";

interface ChatPageProps {
    params: {
        chatId: Id<"chats">;
    }
}

const Chat = ({ params }: ChatPageProps) => {
    const chat = useQuery(api.chats.get, { id: params.chatId });

    const router = useRouter();

    if (chat === null) {
        router.push("/");
    }


    return (
        <div className="bg-neutral-800 w-full h-full flex flex-col">
            <Header />
            <div className="flex flex-col h-full w-full">
                <Body chatId={params.chatId} />
                <div className="w-full fixed bottom-0">
                    <Form chatId={params.chatId} />
                    <p className="w-full text-center text-xs text-neutral-400 my-2 lg:pr-[300px]">Wisdom Wizard GPT can make mistakes. Consider checking important info.</p>
                </div>
            </div>
        </div>
    )
}

export default Chat;