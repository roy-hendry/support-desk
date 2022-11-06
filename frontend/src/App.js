import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTicket from "./pages/NewTicket";

function App() {
	return (
		<>
			<Router>
				<div className="container">
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						{/* Whenever we want to make a private route this is how we do it, we need the route to be inside the PrivateRoute route */}
						<Route path="/new-ticket" element={<PrivateRoute />}>
							<Route path="/new-ticket" element={<NewTicket />} />
						</Route>
					</Routes>
				</div>
			</Router>
			{/* We need this so that we can use react toast wherever we want */}
			<ToastContainer />
		</>
	);
}

export default App;
