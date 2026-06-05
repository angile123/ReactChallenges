export function DisplayData({ searchList }) {
  const { term, linkList } = searchList;
  return (
    <div className="query-container">
      <p className="query-search-term-p">You searched {term}</p>
      <ul className="query-search-list">{linkList}</ul>
    </div>
  );
}
