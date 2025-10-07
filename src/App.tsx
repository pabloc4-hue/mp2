import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListView from './pages/ListView';

export default function App() {
  return (
    <BrowserRouter basename="/mp2">
      <Routes>
        <Route path="/" element={<ListView />} />
      </Routes>
    </BrowserRouter>
  );
}
