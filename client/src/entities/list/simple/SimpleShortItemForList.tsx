import React, {useState} from 'react';
import {Button, Col, Input, List, message, Popconfirm, Row} from "antd";

interface ISimpleShortItemForList {
    index: number;
    id: number;
    name: string;
    description: string;
}

const confirm = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success('Click on Yes');
};

const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('Click on No');
};


interface EditableInputProps {
    initialValue: string;
    onSave: (value: string) => void;
}

const EditableInput: React.FC<EditableInputProps> = ({initialValue, onSave}) => {
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSaveClick = () => {
        onSave(value);
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <div>
            {isEditing ? (
                <Input value={value} onChange={handleInputChange}/>
            ) : (
                <span>{value}</span>
            )}
            {isEditing ? (
                <Button type="primary" onClick={handleSaveClick}>
                    Save
                </Button>
            ) : (
                <Button onClick={handleEditClick}>Edit</Button>
            )}
        </div>
    );
};


const MyComponent: React.FC = () => {
    const handleSave = (value: string) => {
        // Handle saving the value
        console.log('Saved value:', value);
    };

    return (
        <div>
            <EditableInput initialValue="Initial value" onSave={handleSave}/>
        </div>
    );
};


const SimpleShortItemForList: React.FC<ISimpleShortItemForList> = ({
                                                                       id, index, name, description
                                                                   }) => {

    return (
        <>
            <List.Item>
                <Row
                    style={{display: "flex", flexDirection: "row", justifyContent: "space-between", flexBasis: "100%"}}>
                    <Col style={{display: "flex"}}>
                        {index + 1}. {description} ({name})
                        <MyComponent/>
                    </Col>
                    <Col style={{display: "flex"}}>
                        <Popconfirm
                            title="Удалить ед.измерения!"
                            description="Вы уверены что хотите удалить?"

                            onConfirm={(e) => confirm}
                            onCancel={(e) => cancel}
                            okText="Да"
                            cancelText="Нет"
                        >
                            <Button danger>Удалить</Button>
                        </Popconfirm>

                    </Col>
                </Row>

            </List.Item>
        </>
    );
};

export default SimpleShortItemForList;