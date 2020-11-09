import React from 'react'
import {
  Table, TableCell, TableBody, TableRow, TableHead
} from '@material-ui/core';
import {
  StyledTableCell, TableContainer, TableLoadingData, TheadInner
} from './style';
import Spinner from '../Spinner'
import { EmptyData } from '../EmptyData';

export default ({ columns, dataSource, loading }) => (
  <TableContainer>
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
                          column.render(item[column.key] ? item[column.key] : '---', item)
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
    {
     (!dataSource || dataSource.length === 0) && <EmptyData />
    }
    {
      loading
      && (
        <TableLoadingData>
          <Spinner size={24} />
        </TableLoadingData>
      )
    }
  </TableContainer>
)
