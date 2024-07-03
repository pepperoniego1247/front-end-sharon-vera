import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridLogicOperator, GridToolbar } from '@mui/x-data-grid';
import { TableProps } from '../helpers/types';
import dayjs from 'dayjs';

export const Table: React.FC<TableProps> = ({ headers, dataRow, sx, setData, data, active = true, disableSelectionRow = false }: TableProps) => {
  headers.forEach((header: any) => {
    header["headerClassName"] = "super-app-theme--header";
    header["headerAlign"] = "center";
    header["align"] = "center";
  });

  return (
    <Box sx={sx}>
      {/* //! ARREGLAR EL CALENDARIO */}
      <DataGrid sx={{
        backgroundColor: "secondary.main", '& .super-app-theme--header': {
          backgroundColor: 'secondary.main',
        },
        "& .MuiDataGrid-filler": {
          backgroundColor: "secondary.main"
        },
        "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
          backgroundColor: "secondary.main"
        },
        "& .MuiDataGrid-scrollbarFiller .MuiDataGrid-scrollbarFiller--header": {
          backgroundColor: "secondary.main"
        }

      }}
        disableRowSelectionOnClick={disableSelectionRow}
        checkboxSelection
        disableMultipleRowSelection
        initialState={{
          columns: {
            columnVisibilityModel: {
              creationDate: false,
              activo: active
            }
          },
          filter: {
            filterModel: {
              items: [
                // { field: "isActive", operator: "is", value: "true" },
                { field: "activo", operator: "is", value: "true" },
                //! FALTA CORREGIR FILTRO POR FECHAS ACTUALES
              ],
              // logicOperator: GridLogicOperator.Or,
            },
          },
        }}
        columns={headers}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setData(newRowSelectionModel);
        }}
        rowSelectionModel={data}
        slots={{ toolbar: GridToolbar }}
        rows={dataRow}
        slotProps={{
          toolbar: {
            showQuickFilter: true
          },
        }}
      />
    </Box>
  );
}