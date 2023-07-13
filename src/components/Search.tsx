export const Search = (props: {
  searchTerm: string;
  setSearchTerm: (x: string) => void;
  handleSearch: () => void;
}): JSX.Element => {
  return (
    <div className="search-input-container">
      <label htmlFor="search-input"> </label>
      Movie Name:
      <input
        className="search-input"
        value={props.searchTerm}
        onChange={(e) => props.setSearchTerm(e.target.value)}
      />
      <button type="button" onClick={props.handleSearch}>
        Search
      </button>
    </div>
  );
};
