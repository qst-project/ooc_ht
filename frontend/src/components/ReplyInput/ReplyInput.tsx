import { Button, DatePicker, Form, Input, Select, Upload, message } from 'antd';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';

import { createComment, createTask } from '@/store/actions';
import { useAppDispatch, useAppSelector } from '@/store';

interface ReplyInputProps {
    buildingId: number;
    commentId?: number;
    openCreateTask: boolean;
    modeCreateTask: boolean;
    setCreateTask: Function;
}

function ReplyInput({
    buildingId,
    commentId,
    modeCreateTask,
    openCreateTask,
    setCreateTask,
}: ReplyInputProps) {
    const [form] = Form.useForm();
    const [answer, setAnswer] = useState('');
    const [filename, setFilename] = useState();
    const dispatch = useAppDispatch();
    const isParley = useAppSelector(state => state.commentsReducer.isParley);

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
                dispatch(createComment(buildingId, answer, commentId, isParley));
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
            onFinish={({ title, about, date, assignee }) => {
                dispatch(
                    createTask(buildingId,
                        {
                            title,
                            about,
                            deadline: date,
                            assignee,
                            files: filename,
                        }),
                );
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
                name={'file'}
                style={{ width: '50%' }}
            >
                <Upload
                    name='file'
                    action='http://localhost:9090/files/upload/file'
                    headers={{ authorization: 'Basic dXNlcjp1c2Vy' }}
                    onChange={(info) => {
                        if (info.file.status !== 'uploading') {
                            console.log(info.file, info.fileList);
                        }
                        if (info.file.status === 'done') {
                            setFilename(info.file.response);
                            message.success(`${info.file.name} файл успешно загружен`);
                        } else if (info.file.status === 'error') {
                            message.error(`${info.file.name} ошибка загрузки файла.`);
                        }
                    }}
                >
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
        </Form >;

    return modeCreateTask ? (
        <TaskForm />
    ) : <ReplyForm />;
}

export default ReplyInput;
