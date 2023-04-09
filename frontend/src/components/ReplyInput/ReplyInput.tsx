import { Button, DatePicker, Form, Input, Select, Upload } from 'antd';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';

interface ReplyInputProps {
    openCreateTask: boolean;
    modeCreateTask: boolean;
    setCreateTask: Function;
}

function ReplyInput({
    modeCreateTask,
    openCreateTask,
    setCreateTask,
}: ReplyInputProps) {
    const [form] = Form.useForm();
    const [answer, setAnswer] = useState('');
    const onChangeInput = (changedFields: any) => {
        setAnswer(changedFields.answer);
        if (answer.length > 2) {
            setCreateTask(true);
        } else {
            setCreateTask(false);
        }
    };
    const ReplyForm = () =>
        <Form
            // onFieldsChange={onChangeInput}
            onValuesChange={onChangeInput}
            initialValues={{ answer: answer }}
            layout='inline'
            onFinish={({ answer }) => {
                console.log(answer);
            }}
        >
            <Form.Item
                name={'answer'}
                style={{ width: '50%' }}
            >
                <Input value={answer} autoFocus={true} />
            </Form.Item>
            <Form.Item shouldUpdate>
                {
                    () => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Отправить
                        </Button>
                    )
                }
            </Form.Item>
        </Form>;

    const TaskForm = () =>
        <Form
            initialValues={{
                title: answer,
            }}
            onFinish={({ answer }) => {
                console.log(answer);
            }}
        >
            <Form.Item
                name={'title'}
                style={{ width: '50%' }}
            >
                <Input placeholder='Название' />
            </Form.Item>
            <Form.Item
                name={'about'}
                style={{ width: '50%' }}
            >
                <Input.TextArea placeholder='Описание' />
            </Form.Item>
            <Form.Item
                name={'date'}
                style={{ width: '50%' }}
            >
                <DatePicker placeholder='Дэдлайн' />
            </Form.Item>
            <Form.Item
                name={'assignee'}
                style={{ width: '50%' }}
            >
                <Select placeholder='Подотчетный' />
            </Form.Item>
            <Form.Item
                name={'assignee'}
                style={{ width: '50%' }}
            >
                <Upload>
                    <Button icon={<UploadOutlined />}>Загрузить файл</Button>
                </Upload>
            </Form.Item>
            <Form.Item shouldUpdate>
                {
                    () => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Создать
                        </Button>
                    )
                }
            </Form.Item>
        </Form>;

    return modeCreateTask ? (
        <TaskForm />
    ) : <ReplyForm />;
}

export default ReplyInput;