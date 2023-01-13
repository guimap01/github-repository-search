import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from './lib/queryClient';
import { AppRoutes } from './routes';
import { GlobalStyles } from './styles/globalStyles';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CssBaseline />
        <GlobalStyles />
        <AppRoutes />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
