import { Button } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { RowData, useTableDetails } from '../../context/TableDetailsContext';

export const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    sortable: false,
    flex: 1,
    align: 'center',
  },
  {
    field: 'owner',
    headerName: 'Owner',
    sortable: false,
    flex: 1,
    valueGetter: (params) => params.row.owner.login,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'stargazers_count',
    headerName: 'Stars',
    sortable: false,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'html_url',
    headerName: 'Link',
    renderCell: (params: GridRenderCellParams) => (
      <a href={params.value as string} target="_blank" rel="noreferrer">
        {params.value.split('/').pop()}
      </a>
    ),
    sortable: false,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: '',
    headerName: 'Details',
    renderCell: (params: GridRenderCellParams) => {
      const { setData, setOpen } = useTableDetails();
      const handleClick = () => {
        setData(params.row as unknown as RowData);
        setOpen(true);
      };
      return (
        <Button variant="text" onClick={handleClick}>
          Details
        </Button>
      );
    },
    sortable: false,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
];
