import React from 'react';
import { Table } from 'antd';
import { FedTableProps } from './FedTable';

const FedTable = <RecordType extends object = any>({ ...props }: FedTableProps<RecordType>): JSX.Element => {
    return <Table {...props} />;
};
export default FedTable;