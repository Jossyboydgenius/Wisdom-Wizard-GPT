"use client";
import React from 'react';
import { Authenticated, AuthLoading, ConvexReactClient } from "convex/react";

interface ConvexClientProviderProps {
    children: React.ReactNode;
};

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
    children
}: ConvexClientProviderProps) => {
    return(
        <ClerkProvider afterSignUpUrl="/sign-up">
            <ConvexClientProviderWithClerk useAuth={useAuth} client={convex}>
                <AuthLoading>
                    <Loading />
                </AuthLoading>
                </Authenticated>
            </ConvexClientProviderWithClerk>
        </ClerkProvider>
    )
}