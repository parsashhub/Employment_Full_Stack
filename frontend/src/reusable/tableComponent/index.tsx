import React, { FC, useCallback, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import ActionsComponent from "./ActionsComponent";
import PropTypes from "prop-types";
import {
  useReactTable,
  getPaginationRowModel,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import clsx from "clsx";

interface EnhancedTableProps {
  columns: any[];
  data: any[];
  onRowClick: (event: React.MouseEvent, row: any) => void;
  actions?: {
    setPageConfig: (config: { perPage: number; page: number }) => void;
    meta: {
      total: number;
    };
    page: number;
    sort: string;
    links: any;
  };
  disableAction?: boolean;
}

const EnhancedTable: FC<EnhancedTableProps> = ({
  columns,
  data,
  onRowClick,
  actions,
  disableAction,
}) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const { pageSize, pageIndex } = table.getState().pagination;

  const handleChangePage = useCallback(
    (e: any, newPage: number) => {
      table.setPageIndex(newPage);
    },
    [table.setPageIndex],
  );

  const handleChangeRowsPerPage = useCallback(
    (e: any) => {
      const size = e.target.value ? Number(e.target.value) : 10;
      table.setPageSize(size);
      actions.setPageConfig({ perPage: size, page: 1 });
    },
    [table.setPageSize],
  );
  //
  useEffect(() => {
    if (disableAction) {
      table.setPageSize(data.length === 0 ? 10 : data.length);
    }
  }, [data, table.setPageSize, disableAction]);

  return (
    <Box className="flex flex-col min-h-full sm:border-1 sm:rounded-16 w-full">
      <Paper className="rounded-0 lg:rounded-16 lg:shadow pt-10" elevation={10}>
        <TableContainer className="flex flex-1">
          <Table className="simple">
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableCell
                        className="whitespace-nowrap p-4 md:p-12"
                        key={header.id}
                        colSpan={header.colSpan}
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => {
                // if (collapsable) return <RowWithCollapsable />
                return (
                  <TableRow
                    key={row.id}
                    hover={true}
                    onClick={(ev) => onRowClick(ev, row)}
                    className="truncate cursor-pointer py-32"
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          className={clsx("p-4 py-32 md:p-12")}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className="flex justify-center items-center"
          rowsPerPageOptions={
            disableAction
              ? []
              : [
                  10,
                  25,
                  {
                    label: "همه",
                    value:
                      (actions?.meta ? actions.meta.total : data.length) + 1,
                  },
                ]
          }
          component="div"
          count={actions?.meta?.total ?? data.length}
          rowsPerPage={pageSize}
          page={pageIndex}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            native: true,
          }}
          labelRowsPerPage={"ردیف در هر صفحه:"}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => {
            if (disableAction) return;
            const item = (actions?.page - 1) * pageSize;
            return `${item + from}-${item + to} از ${count}`;
          }}
          ActionsComponent={(e) =>
            !disableAction && <ActionsComponent {...e} actions={actions} />
          }
        />
        {/*<TablePagination*/}
        {/*    component="div"*/}
        {/*    className="justify-center items-center"*/}
        {/*    classes={{*/}
        {/*        root: "flex mt-10",*/}
        {/*    }}*/}
        {/*    rowsPerPageOptions={*/}
        {/*        disableAction*/}
        {/*            ? []*/}
        {/*            : [*/}
        {/*                10,*/}
        {/*                25,*/}
        {/*                50,*/}
        {/*                {*/}
        {/*                    label: "همه",*/}
        {/*                    value:*/}
        {/*                        (actions.meta ? actions.meta.total : data.length) + 1,*/}
        {/*                },*/}
        {/*            ]*/}
        {/*    }*/}
        {/*    colSpan={5}*/}
        {/*    count={actions?.meta?.total ?? data.length}*/}
        {/*    labelDisplayedRows={({from, to, count}) => {*/}
        {/*        if (disableAction) return;*/}
        {/*        const item = (actions.page - 1) * pageSize;*/}
        {/*        return `${item + from}-${item + to} از ${count}`;*/}
        {/*    }}*/}
        {/*    labelRowsPerPage={"ردیف در هر صفحه:"}*/}
        {/*    rowsPerPage={pageSize}*/}
        {/*    page={pageIndex}*/}
        {/*    SelectProps={{*/}
        {/*        inputProps: {"aria-label": "rows per page"},*/}
        {/*        native: false,*/}
        {/*    }}*/}
        {/*    onPageChange={handleChangePage}*/}
        {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
        {/*    ActionsComponent={(e) =>*/}
        {/*        !disableAction && (*/}
        {/*            <ActionsComponent {...e} actions={actions} data={data}/>*/}
        {/*        )*/}
        {/*    }*/}
        {/*/>*/}
      </Paper>
    </Box>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
};

export default EnhancedTable;
