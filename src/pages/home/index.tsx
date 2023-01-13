import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DataGrid } from '@mui/x-data-grid';
import { Input } from '../../components/Input';
import { useListGithub } from '../../lib/queryClient/hooks/useListGithub';
import { columns } from './tableColums';
import { TableDetailsProvider } from '../../context/TableDetailsContext';
import { DetailsDialog } from './components/DetailsDialog';
import * as S from './styles';

type FormValues = {
  search: string;
};

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const { data, isFetching } = useListGithub(searchValue, page);
  const { handleSubmit, control, getValues } = useForm<FormValues>({
    defaultValues: {
      search: '',
    },
  });
  const onSubmit = (data: FormValues) => {
    setSearchValue(data.search);
  };
  const onClickIcon = () => {
    onSubmit(getValues());
  };
  return (
    <S.HomeWrapper>
      <S.HomeSearchContainer>
        <S.HomeSearchForm onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Search Repository"
                endAdornment={<SearchIcon />}
                onClickIcon={onClickIcon}
              />
            )}
          />
        </S.HomeSearchForm>
      </S.HomeSearchContainer>
      {data?.items?.length === 0 || !data ? (
        <S.HomeNoResults>No results found</S.HomeNoResults>
      ) : (
        <S.HomeDataGridContainer>
          <DataGrid
            rows={data?.items || []}
            columns={columns}
            rowsPerPageOptions={[10]}
            pageSize={10}
            onPageChange={(pageNumber) => {
              setPage(pageNumber);
            }}
            paginationMode="server"
            rowCount={data?.total_count || 0}
            disableColumnFilter
            disableColumnMenu
            disableSelectionOnClick
            loading={isFetching}
          />
        </S.HomeDataGridContainer>
      )}
      <DetailsDialog />
    </S.HomeWrapper>
  );
};

export default () => (
  <TableDetailsProvider>
    <Home />
  </TableDetailsProvider>
);
