import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OmOssPage from './pages/about';
import SoknadPage from './pages/application';
import IndexPage from './pages/home';
import Navbar from './components/all/Navbar';
import { Provider } from 'react-redux';
import { store } from './services/Store';
import Footer from './components/all/Footer';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/omoss" element={<OmOssPage />} />
          <Route path="/soknad" element={<SoknadPage />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
