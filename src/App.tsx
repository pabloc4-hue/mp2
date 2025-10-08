import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListView from './pages/ListView';
import GalleryView from './pages/GalleryView';
import DetailView from './pages/DetailView';
import Header from './components/Header';



export default function App() {
  return (
    <BrowserRouter basename="/mp2">
      <Header /> {/* Put the header here */}
      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/gallery" element={<GalleryView />} />
        <Route path="/meal/:idMeal" element={<DetailView />} />
      </Routes>
    </BrowserRouter>
  );
}

    