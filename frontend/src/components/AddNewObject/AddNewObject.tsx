import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';

function AddNewObject() {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    useEffect(() => {
        forceUpdate({});
    }, []);

    return (
        <Form
            onFinish={() => console.log('create event')}
            form={form}
        >
            <Form.Item
                name='name'
                label='Имя'
                rules={[
                    {
                        required: true,
                        message: 'Введите имя',
                    },
                    {
                        min: 3,
                        message: 'Имя слишком короткое',
                    },
                ]}
            >
                <Input
                    placeholder='Имя'
                    size='middle'
                />
            </Form.Item>
            <Form.Item
                name='county'
                label='Округ'
                rules={[
                    {
                        required: true,
                        message: 'Введите округ',
                    },
                    {
                        min: 3,
                        message: 'Округ слишком короткий',
                    },
                ]}
            >
                <Input
                    placeholder='Округ'
                    size='middle'
                />
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
                            Добавить
                        </Button>
                    )
                }
            </Form.Item>
        </Form>
    );
}

export default AddNewObject;