import { useState } from "react";
import { useSelector } from "react-redux";

function NewTicket() {
	const { user } = useSelector((state) => state.auth);
	const [name] = useState(user.name);
	const [email] = useState(user.email);
	const [product, setProduct] = useState("iPhone");
	const [description, setDescription] = useState(user.description);

	const onSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div>
			<section className="heading">
				<h1>Create New Ticket</h1>
				<p>Please fill out the form below</p>
			</section>
			<section className="form">
				<div className="form-group">
					<label htmlFor="name">Customer Name</label>
					<input
						className="form-control"
						type="text"
						value={name}
						disabled
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Customer Email</label>
					<input
						className="form-control"
						type="text"
						value={email}
						disabled
					/>
				</div>
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="product">Product </label>
						<select
							name="product"
							id="product"
							value={product}
							onChange={(e) => setProduct(e.target.value)}
						>
							<option value="iMac">iMac</option>
							<option value="iPad">iPad</option>
							<option value="iPhone">iPhone</option>
							<option value="Macbook Pro">Macbook Pro</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="description">
							Description of the issue
						</label>
						<textarea
							className="form-control"
							name="description"
							id="description"
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
					</div>
					<div className="form-group">
						<button className="btn btn-block">Submit</button>
					</div>
				</form>
			</section>
		</div>
	);
}

export default NewTicket;
