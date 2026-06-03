export default function Query({ term = null }) {
  return (
    <div className="query-container">
      <p className="query-search-term-p">You searched {term}</p>

      <ul className="query-search-list">
        <li className="query-item">1</li>
        <li className="query-item">2</li>
        <li className="query-item">3</li>
      </ul>
    </div>
  );
}
