import { ThemeProvider } from '@/components/theme-provider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from '@/pages/landing';
import { Launch } from '@/pages/launch';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="contextmesh-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/launch" element={<Launch />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;