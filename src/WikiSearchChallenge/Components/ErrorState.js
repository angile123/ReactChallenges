export function ErrorState({ errMsg }) {
  return (
    <div className="error-container">
      <p>{errMsg}</p>
    </div>
  );
}
