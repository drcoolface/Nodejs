// TableComponent.jsx
import React from 'react';
import { Table } from 'antd';
import { UserType } from '../Constants/types';
import { Typography } from 'antd';

const { Title } = Typography;
interface TableComponentProps {
  data: UserType[];
}

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
    type: 'password'
  },
];

const UserList: React.FC<TableComponentProps> = ({ data }) => (
    <>
    <Title>User List</Title>

  <Table dataSource={data} columns={columns} style={{width:"70%"}}/>;
  </>
);

export default UserList;
