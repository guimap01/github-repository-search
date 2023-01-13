import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  const screen = render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...screen,
    queryClient,
  };
};
