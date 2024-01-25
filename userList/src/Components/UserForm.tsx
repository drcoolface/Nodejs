import React from 'react';
import { Button, Form, Input } from 'antd';
import { UserType } from '../Constants/types';
import { RuleObject } from 'antd/es/form';
import { Typography } from 'antd';

const { Title } = Typography;



interface ISubmitForm {
    onFinish: (value: UserType) =>void
}

const UserForm: React.FC<ISubmitForm> = ({onFinish}) => {
    // const [generatedPassword, setGeneratedPassword] = React.useState<string>('');
    const [isPasswordGenerated, setIsPasswordGenerated] = React.useState<boolean>(false);
    const [form] = Form.useForm(); // Create a form instance


    const handleGeneratePassword = () => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPassword = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomPassword += charset[randomIndex];
  }

//   setGeneratedPassword(randomPassword);
  form.setFieldValue("password",randomPassword)
  setIsPasswordGenerated(true);
};

      const validateAge = (rule:RuleObject, value:number) => {
        if (isNaN(value) || value <= 18) {
          return Promise.reject('Age must be greater than 18!');
        }
        return Promise.resolve();
      };

      

      const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault; 
        form.validateFields().then((values: UserType) => {

          onFinish(values);
          form.resetFields(); 
          setIsPasswordGenerated(false); 
        });
      };

    return(
  <Form
  form ={form}
    name="userform"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 1000 }}
    initialValues={{ remember: true }}
    onFinish={handleFormSubmit}
  >
    <Title style={{textAlign:"center"}}> Create User </Title>
    <Form.Item<UserType>
      label="Full Name"
      name="name"
      rules={[{ required: true, message: 'Please input your full name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<UserType>
      label="Age"
      name="age"
      rules={[{ required: true, message: 'Please input your age!' },{validator:validateAge}]}
    >
      <Input />
    </Form.Item>


    <Form.Item<UserType>
      label="Email"
      name="email"
      rules={[{type:'email', message: 'Email format is wrong!'}]}
    >
      <Input />
    </Form.Item>


    <Form.Item<UserType>
    label="Password"
    name="password"
     rules={[{ required: !isPasswordGenerated, message: 'Please generate password!' }]}>
    <Input   />
    </Form.Item>
    <Button type="dashed" style={{margin:"-5% 0% 5% 41%" }}  onClick={handleGeneratePassword} disabled={isPasswordGenerated}>
    Generate Password
    </Button>


    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
)};

export default UserForm;