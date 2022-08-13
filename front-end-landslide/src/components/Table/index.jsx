import React, { useState, useMemo, useEffect } from 'react';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import axios from 'axios';
import moment from 'moment';
import { alertData } from '../../utils/APIRoutes';

const WarningTable = () => {
    const [sortColumn, setSortColumn] = useState('type');
    const [sortAsc, setSortAsc] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(alertData).then((res) => {
                setData(res.data);
            });
        };
        fetchData();
    }, []);
    const sortedData = useMemo(() => {
        return data.slice().sort((a, b) => {
            const left = sortAsc ? a : b;
            const right = sortAsc ? b : a;
            const leftValue = String(left[sortColumn]);
            const rightValue = String(right[sortColumn]);
            return leftValue.localeCompare(rightValue, 'en', {
                numeric: true,
                sensitivity: 'base',
            });
        });
    }, [sortColumn, sortAsc, data]);
    function handleSort(id) {
        if (id === sortColumn) {
            setSortAsc((asc) => !asc);
        } else {
            setSortColumn(id);
            setSortAsc(true);
        }
    }
    return (
        <TableBuilder
            data={sortedData}
            sortColumn={sortColumn}
            sortOrder={sortAsc ? 'ASC' : 'DESC'}
            onSort={handleSort}
        >
            <TableBuilderColumn id='type' header='Canh bao' sortable>
                {(row) => row.type}
            </TableBuilderColumn>
            <TableBuilderColumn id='message' header='Noi dung' sortable>
                {(row) => row.message}
            </TableBuilderColumn>
            <TableBuilderColumn id='data' header='Thong so' sortable>
                {(row) => JSON.stringify(row.data)}
            </TableBuilderColumn>
            <TableBuilderColumn id='date' header='Thoi gian' sortable>
                {(row) => moment(row.date).format('lll')}
            </TableBuilderColumn>
        </TableBuilder>
    );
};

export default WarningTable;
