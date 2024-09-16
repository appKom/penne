import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from './pages/about';
import ApplicationPage from './pages/application';
import HomePage from './pages/home';
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
          <Route path="/" element={<HomePage />} />
          <Route path="/styret" element={<AboutPage />} />
          <Route path="/soknad" element={<ApplicationPage />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
