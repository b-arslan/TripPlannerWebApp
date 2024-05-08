import React from "react";
import { DatePicker, Space, AutoComplete, Modal, Col, Row, Form, Button } from 'antd';
import type { DatePickerProps } from 'antd';

interface PlannerDialogProps {
    isModalVisible: boolean;
    handleOk: () => void;
    handleSearch: (searchText: string) => void;
    options: { value: string }[];
}

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};

const PlannerDialog: React.FC<PlannerDialogProps> = ({ isModalVisible, handleOk, handleSearch, options }) => {

    const [form] = Form.useForm();

    const onFormSubmit = async () => {
        try {
            const values = await form.validateFields();
            handleOk(); 
            console.log('Form Data:', values);
        } catch (error) {
            console.log('Validation Failed:', error);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        handleOk();
    };

    return (
        <Modal
            title="Planner"
            open={isModalVisible}
            onOk={onFormSubmit}
            onCancel={handleCancel}
            style={{ zIndex: '9999' }}
            centered
            maskClosable={false}
            footer={[
                <Button key="submit" type="primary" onClick={onFormSubmit}>
                    Submit
                </Button>
            ]}
        >
            <Form form={form} layout="vertical">
                <Row style={{ marginTop: '2rem', paddingRight: '20px' }}>
                    <Col span={12}>
                        <p>Start Date</p>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="startDate"
                            rules={[{ required: true, message: 'Please select start date!' }]}
                        >
                            <DatePicker onChange={onChange} style={{width: '250px'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ paddingRight: '20px' }}>
                    <Col span={12}>
                        <p>End Date</p>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="endDate"
                            rules={[{ required: true, message: 'Please select end date!' }]}
                        >
                            <DatePicker onChange={onChange} style={{width: '250px'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '0.2rem', paddingRight: '20px' }}>
                    <Col span={12}>
                        <p>Country</p>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="country"
                            rules={[{ required: true, message: 'Please select a city!' }]}
                        >
                            <AutoComplete 
                                style={{width: '250px'}}
                                options={options}
                                onSearch={handleSearch}
                                placeholder='Type a city...'
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default PlannerDialog;
