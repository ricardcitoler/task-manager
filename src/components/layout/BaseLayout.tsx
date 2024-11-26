"use client"
import React, { FC, ReactNode, Suspense } from "react";
import { ReduxProvider } from "@/redux/redux-provider";
import store from "@/redux/store";

interface Props {
    children: ReactNode;
}

const BaseLayout: FC<Props> = ({ children }) => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </Suspense>
    );

}
export default BaseLayout;