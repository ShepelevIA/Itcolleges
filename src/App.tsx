import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';

import { PreloaderProvider } from './Context/PreloaderContext/PreloaderContext';
import Preloader from './components/preloader/Preloader';

export default function App() {
    return (
        <PreloaderProvider>
            <Preloader /> 
            <Header />
            <Main />
            <Footer />
        </PreloaderProvider>
    );
}
