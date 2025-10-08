import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <h1 className="app-title">Tasty Meals</h1>
      <nav className="app-nav">
        <Link to="/">Search</Link>
        <Link to="/gallery">Gallery</Link>
      </nav>
    </header>
  );
}
