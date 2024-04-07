import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface Data {
  key: string;
  name: string;
  age: number;
  address: string;
}

const dataSource: Data[] = [
  {
    key: '1',
    name: 'John Doe',
    age: 30,
    address: 'New York',
  },
  {
    key: '2',
    name: 'Jane Smith',
    age: 25,
    address: 'Los Angeles',
  },
];

const columns: ColumnsType<Data> = [
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
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const Tbody: React.FC = () => {
  return (
    <Table<Data>
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default Tbody;
