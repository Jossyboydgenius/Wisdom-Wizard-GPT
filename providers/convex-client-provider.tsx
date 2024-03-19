"use client";
import React from 'react';

interface ConvexClientProviderProps {
    children: React.ReactNode;
};

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;