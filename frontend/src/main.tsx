import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider>
     <App />
    </ThemeProvider>
    </QueryClientProvider>
    </BrowserRouter>
)
