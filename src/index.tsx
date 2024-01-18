import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { StoreProvider } from 'app/providers/StoreProvider';
import { MenuInitiatedProvider } from 'app/providers/MenuInitiatedProvider';
import App from './app/App';
import 'app/styles/index.scss';
import './shared/config/i18n/i18n';

render(
    <BrowserRouter>
        <StoreProvider>
            <ThemeProvider>
                <MenuInitiatedProvider>
                    <App />
                </MenuInitiatedProvider>
            </ThemeProvider>
        </StoreProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);
