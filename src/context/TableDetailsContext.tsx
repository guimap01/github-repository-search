import { createContext, useContext, useState } from 'react';

interface TableDetailsProps {
  children: React.ReactNode;
}

export type RowData = {
  commits_url: string;
  forks_url: string;
  owner: {
    url: string;
  };
};

type TableDetailsContextData = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: RowData;
  setData: (data: RowData) => void;
};

const TableDetailsContext = createContext<TableDetailsContextData>(
  {} as TableDetailsContextData
);

export const TableDetailsProvider = ({ children }: TableDetailsProps) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<RowData>({} as RowData);

  return (
    <TableDetailsContext.Provider value={{ open, setOpen, data, setData }}>
      {children}
    </TableDetailsContext.Provider>
  );
};

export const useTableDetails = () => {
  return useContext(TableDetailsContext);
};
