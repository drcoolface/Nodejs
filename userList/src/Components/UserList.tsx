// TableComponent.jsx
import React, { useState } from 'react';
import { Table, Typography } from 'antd';
import { UserType } from '../Constants/types';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface TableComponentProps {
  data: UserType[];
}

const UserList: React.FC<TableComponentProps> = ({ data }) => {
  const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({});

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      render: (text: string, record: UserType) => (
        <>
          {visiblePasswords[record.name] ? (
            <span>{text}</span>
          ) : (
            <span>{'*'.repeat(text.length)}</span>
          )}
        </>
      ),
    },
    {
      title: 'Action',
      render: ( record: UserType) => (
        <span onClick={() => togglePasswordVisibility(record)}>
          {visiblePasswords[record.name] ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </span>
      ),
    },
  ];

  const togglePasswordVisibility = (record: UserType) => {
    setVisiblePasswords((prevVisiblePasswords) => ({
      ...prevVisiblePasswords,
      [record.name]: !prevVisiblePasswords[record.name],
    }));
  };

  return (
    <>
      <Title>User List</Title>
      <Table dataSource={data} columns={columns} style={{ width: '70%' }} />
    </>
  );
};

export default UserList;
