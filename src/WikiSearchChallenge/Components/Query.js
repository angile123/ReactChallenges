export default function Query({ term, queries }) {
  return (
    <div className="query-container">
      <p className="query-search-term-p">You searched {term}</p>

      <ul className="query-search-list">{queries}</ul>
    </div>
  );
}
