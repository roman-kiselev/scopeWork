import { Modal, Space } from "antd";
import React from "react";

interface EmptyModalProps {
    children: React.ReactNode;
    open: boolean;
    handleCancel: () => void;
    title: string;
}

const EmptyModal: React.FC<EmptyModalProps> = ({
    children,
    open,
    handleCancel,
    title,
}) => {
    return (
        <Modal
            open={open}
            title={title}
            onOk={() => {}}
            onCancel={handleCancel}
            footer={<></>}
        >
            <Space>{children}</Space>
        </Modal>
    );
};

export default EmptyModal;
