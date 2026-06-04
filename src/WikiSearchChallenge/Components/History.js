export function History({ history }) {
  return (
    <div className="history-container">
      <div className="history-title-container">
        <p className="history-title-p">History</p>
      </div>

      <ol>{history}</ol>
    </div>
  );
}
