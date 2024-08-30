import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred. Sagar You are 1 Step closer.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}