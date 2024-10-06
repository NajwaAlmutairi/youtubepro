import { useRouteError } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  if (localStorage.getItem('user')) {
    localStorage.removeItem('user');
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 mx-4">
        <div className="flex justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" height="80px" viewBox="0 0 24 24" width="80px" fill="#EA3323">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        </div>
        <h1 className="text-center text-3xl font-bold text-red-600 mb-4">Oops! Page Not Found</h1>
        <p className="text-center text-gray-600 mb-4">Sorry, an unexpected error has occurred.</p>
        <p className="text-center text-gray-500 italic mb-6">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
