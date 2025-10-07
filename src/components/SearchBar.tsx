// src/components/SearchBar.tsx
import './SearchBar.css';

type Props = {
  value: string;                       // texto del input
  onChange: (next: string) => void;    // actualizar búsqueda
  sortAsc: boolean;                    // estado del orden
  onToggleSort: () => void;            // alternar A→Z / Z→A
  placeholder?: string;                // opcional
};

export default function SearchBar({
  value,
  onChange,
  sortAsc,
  onToggleSort,
  placeholder = 'Search meals… (e.g., beef, pasta, cake)',
}: Props) {
  return (
    <div className="sb-toolbar">
      <label className="sr-only" htmlFor="meal-search">Search meals</label>
      <input
        id="meal-search"
        className="sb-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search meals"
      />

      <button
        className="sb-sort-btn"
        type="button"
        onClick={onToggleSort}
      >
        Sort: {sortAsc ? 'A → Z' : 'Z → A'}
      </button>

      {value && (
        <button
          className="sb-clear-btn"
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          title="Clear"
        >
          Clear
        </button>
      )}
    </div>
  );
}
