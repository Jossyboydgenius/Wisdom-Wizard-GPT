"use client";

import React, { ReactNode } from 'react'; 
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

interface ConvexClientProviderProps {
    children: React.ReactNode;
};

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
    children
}: ConvexClientProviderProps) => {
    return (
        <ClerkProvider afterSignUpUrl="/sign-up">
            <ConvexProviderWithClerk useAuth={useAuth} client={convex} children={undefined}>
                {/* <AuthLoading>
                    <Loading />
                </AuthLoading> */}
                <Authenticated children={undefined}>
                    {children}
                </Authenticated>
                <Unauthenticated children={undefined}>
                    {children}
                </Unauthenticated>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}



