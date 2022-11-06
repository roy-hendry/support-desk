import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = () => {
	const { loggedIn, checkingStatus } = useAuthStatus();

	if (checkingStatus) {
		return <Spinner />;
	}

	// Depending on if the user is logged in we'll either send them to the outlet or we'll redirect them to the login page
	return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
