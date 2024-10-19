import { Navigate } from "react-router-dom";
import { useAppSelector } from "./hooks";

const ErrorPage = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  if (!isLoggedIn) return <Navigate to="/" />;
  return (
    <div
      style={{
        padding: "16px 80px",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
};

export default ErrorPage;
