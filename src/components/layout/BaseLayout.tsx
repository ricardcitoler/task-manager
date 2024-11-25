"use client"
import React, { FC, ReactNode, Suspense } from "react";
import store from "@/redux/store";
import { Provider as ReduxProvider } from "react-redux";

interface Props {
    children: ReactNode;
}

const BaseLayout: FC<Props> = ({ children }) => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReduxProvider store={store}>
                {children}
            </ReduxProvider>
        </Suspense>
    );

}
export default BaseLayout;