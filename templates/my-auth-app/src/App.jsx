import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { ThemeProvider } from './context/ThemeContext';
import Chatbot from './pages/Chatbot';
import LandingPage from './pages/LandingPage';


function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/" element={<LandingPage />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;