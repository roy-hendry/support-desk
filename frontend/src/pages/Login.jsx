import { useState } from "react";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<>
			<section className="heading">
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Please log in to get support</p>
			</section>

			<section className="form">
				<form onSubmit={onSubmit}>
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
						<button className="btn btn-block">Submit</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Login;
