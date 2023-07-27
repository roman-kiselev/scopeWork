import { Spin } from "antd";
import React, { Suspense } from "react";

interface ISuspenseLoadProps {
    children: React.ReactNode;
}

const SuspenseLoad: React.FC<ISuspenseLoadProps> = ({ children }) => {
    return (
        <>
            <Suspense fallback={<Spin />}>{children}</Suspense>
        </>
    );
};

export default SuspenseLoad;
