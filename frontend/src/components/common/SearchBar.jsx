/**
 * SearchBar — reusable controlled search input component.
 *
 * Props:
 *   value       {string}   — controlled value
 *   onChange    {function} — (value: string) => void
 *   placeholder {string}   — input placeholder text
 *   onClear     {function} — optional clear button callback
 *   className   {string}   — additional wrapper classes
 */
const SearchBar = ({
  value = '',
  onChange,
  placeholder = 'Search...',
  onClear,
  className = '',
}) => (
  <div className={`relative flex items-center ${className}`}>
    <span className="absolute left-3 text-gray-400 pointer-events-none">🔍</span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="form-input pl-9 pr-9"
    />
    {value && onClear && (
      <button
        onClick={onClear}
        className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Clear search"
      >
        ✕
      </button>
    )}
  </div>
);

export default SearchBar;