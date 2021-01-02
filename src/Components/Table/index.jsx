import React, {useState} from 'react'
import {
    Table, TableCell, TableBody, TableRow, TableHead
} from '@material-ui/core';
import {
    StyledTableCell, TableContainer, TableLoadingData, TheadInner
} from './style';
import Spinner from '../Spinner'
import {EmptyData} from '../EmptyData';
import TablePagination from "@material-ui/core/TablePagination";

export default ({columns, dataSource, loading}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
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
                                    dataSource.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((item) => (
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
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 30]}
                    component="div"
                    count={dataSource.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
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
}
