import { Modal, Space } from "antd";
import React from "react";

interface EmptyModalProps {
    children: React.ReactNode;
    open: boolean;
    handleCancel: () => void;
    title: string;
    isSpace?: boolean;
}

const EmptyModal: React.FC<EmptyModalProps> = ({
    children,
    open,
    handleCancel,
    title,
    isSpace = true,
}) => {
    return (
        <Modal
            open={open}
            title={title}
            //onOk={() => {}}
            onCancel={handleCancel}
            footer={<></>}
            width={"80%"}
        >
            {isSpace ? <Space>{children}</Space> : children}
        </Modal>
    );
};

export default EmptyModal;
