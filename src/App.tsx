import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OmOssPage from './pages/omoss';
import SoknadPage from './pages/soknad';
import IndexPage from './pages/hjem';
import Navbar from './components/all/Navbar';
import { Provider } from 'react-redux';
import { store } from './services/Store';

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
      </Router>
    </Provider>
  );
}

export default App;
