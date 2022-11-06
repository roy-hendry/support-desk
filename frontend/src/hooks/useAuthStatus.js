import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);

	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		if (user) {
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}

		setCheckingStatus(false);

		// We want this to run whenever user changes, that's why we have it as a dependency
	}, [user]);

	return { loggedIn, checkingStatus };
};
