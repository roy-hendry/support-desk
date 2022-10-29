import { useState } from "react";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";

function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});

	const { name, email, password, password2 } = formData;

	const dispatch = useDispatch();

	// Now if we use this values they'll be the state values from authSlice
	const { user, isLoading, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	// If we don't have this onChange you can't actually change the values in the fields so it's pretty important
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (password !== password2) {
			toast.error("Passwords do not match");
		} else {
			const userData = {
				name,
				email,
				password,
			};

			dispatch(register(userData));
		}
	};

	return (
		<>
			<section className="heading">
				<h1>
					<FaUser /> Register {user}
				</h1>
				<p>Please create an account</p>
			</section>

			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label>Enter your name:</label>
						<input
							className="form-control"
							type="text"
							id="name"
							name="name"
							value={name}
							onChange={onChange}
							placeholder="Name"
							required
						/>
					</div>
					<div className="form-group">
						<label>Enter your email:</label>
						<input
							className="form-control"
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={onChange}
							placeholder="Email"
							required
						/>
					</div>
					<div className="form-group">
						<label>Enter your password:</label>
						<input
							className="form-control"
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={onChange}
							placeholder="Password"
							required
						/>
					</div>
					<div className="form-group">
						<label>Confirm your password:</label>
						<input
							className="form-control"
							type="password"
							id="password2"
							name="password2"
							value={password2}
							onChange={onChange}
							placeholder="Password"
							required
						/>
					</div>
					<div className="form-group">
						<button className="btn btn-block">Submit</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Register;
