interface ErrorPageProps {
  error: string;
}

const ErrorPage = ({ error }: ErrorPageProps) => {
  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Feil ved henting av {error}</h2>
        <p className="text-slate-400 mt-2">Vennligst prøv igjen senere.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
