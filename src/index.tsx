import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { StoreProvider } from 'app/providers/StoreProvider';
import 'shared/config/i18n/i18n';
import App from './app/App';
import 'app/styles/index.scss';

render(
    <BrowserRouter>
        <StoreProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </StoreProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);

export { Theme } from 'app/providers/ThemeProvider';
