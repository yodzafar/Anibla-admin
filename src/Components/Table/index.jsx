import React from 'react'
import {
    Table, TableCell, TableBody, TableRow, TableHead
} from '@material-ui/core';
import {
    StyledTableCell, TableContainer, TableLoadingData, TheadInner
} from './style';
import Spinner from '../Spinner'
import {EmptyData} from '../EmptyData';

export default ({columns, dataSource, loading}) => (
    <TableContainer>
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((column, idx) => (
                                <StyledTableCell key={`${idx + 1}`} width={column.width}>
                                    <TheadInner>
                                        {column.icon && column.icon}
                                        {column.title}
                                    </TheadInner>
                                </StyledTableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                {
                    dataSource && dataSource.length > 0
                    && (
                        <TableBody>
                            {
                                dataSource.map((item) => (
                                    <TableRow key={item.key}>
                                        {
                                            columns.map((column, idx) => (
                                                <TableCell key={`${idx + 1}`}>
                                                    {
                                                        column.render(item[column.key] !== undefined ? item[column.key] : '---', item)
                                                    }
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    )
                }
            </Table>
        </>
        {
            (!dataSource || dataSource.length === 0) && <EmptyData/>
        }
        {
            loading
            && (
                <TableLoadingData>
                    <Spinner size={24}/>
                </TableLoadingData>
            )
        }
    </TableContainer>
)

// export default () => {
//     const rows = [
//         { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//         { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//         { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//         { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//         { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//         { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//         { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//         { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//         { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     ];
//
//     const columns = [
//         { field: 'id', headerName: 'ID', width: 70 },
//         { field: 'firstName', headerName: 'First name', width: 130 },
//         { field: 'lastName', headerName: 'Last name', width: 130 },
//         {
//             field: 'age',
//             headerName: 'Age',
//             type: 'number',
//             width: 90,
//         },
//         {
//             field: 'fullName',
//             headerName: 'Full name',
//             description: 'This column has a value getter and is not sortable.',
//             sortable: false,
//             width: 160,
//             valueGetter: (params) => {
//                 return (<div>{`${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`}</div>)
//             }
//         },
//     ];
//
//     return (
//         <div style={{ height: 400, width: '100%' }}>
//             <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
//         </div>
//     )
// }
