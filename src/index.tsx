import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { StoreProvider } from 'app/providers/StoreProvider';
import App from './app/App';
import 'app/styles/index.scss';

const container = document.getElementById('root');

if (!container) {
    throw new Error('');
}
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </StoreProvider>
    </BrowserRouter>,
);

export { Theme } from 'app/providers/ThemeProvider';
