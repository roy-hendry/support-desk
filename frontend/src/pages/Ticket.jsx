import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
import {
	getNotes,
	createNote,
	reset as notesReset,
} from "../features/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";

const customStyles = {
	content: {
		width: "600px",
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		position: "relative",
	},
};

Modal.setAppElement("#root");

function Ticket() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [noteText, setNoteText] = useState("");

	const { ticket, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.tickets
	);

	// We are just renaming it to notesIsLoading because we have another check above to check if it is loading for the tickets and we don't want them to clash
	const { notes, isLoading: notesIsLoading } = useSelector(
		(state) => state.notes
	);

	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { ticketId } = useParams();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		dispatch(getTicket(ticketId));
		dispatch(getNotes(ticketId));
		// eslint-disable-next-line
	}, [isError, message, ticketId]);

	// Close a ticket
	const onTicketClose = () => {
		dispatch(closeTicket(ticketId));
		toast.success("Ticket closed");
		navigate("/tickets");
	};

	// Create note submit
	const onNoteSubmit = (e) => {
		e.preventDefault();
		dispatch(createNote({ noteText, ticketId }));
		closeModal();
	};

	// Open/close modal
	const openModal = () => setModalIsOpen(true);
	const closeModal = () => setModalIsOpen(false);

	if (isLoading || notesIsLoading) {
		return <Spinner />;
	}

	if (isError) {
		return <h3>Something Went Wrong</h3>;
	}

	return (
		<div className="ticket-page">
			<header className="ticket-header">
				<BackButton url="/tickets" />
				<h2>
					Ticket ID: {ticket._id}
					<span className={`status status-${ticket.status}`}>
						{ticket.status}
					</span>
				</h2>
				<h3>
					Date Submitted:
					{new Date(ticket.createdAt).toLocaleString("en-UK")}
				</h3>
				<h3>Product: {ticket.product}</h3>
				<hr />
				<div className="ticket-desc">
					<h3>Description Of Issue</h3>
					<p>{ticket.description}</p>
				</div>
				<h2>Notes</h2>
			</header>

			{ticket.status !== "closed" && (
				<button className="btn" onClick={openModal}>
					<FaPlus /> Add Note
				</button>
			)}

			{notes.map((note) => (
				<NoteItem key={note._id} note={note} />
			))}

			{ticket.status !== "closed" && (
				<button
					className="btn btn-block btn-danger"
					onClick={onTicketClose}
				>
					Close Ticket
				</button>
			)}

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Add Note"
			>
				<h2>Add Note</h2>
				<button className="btn-close" onClick={closeModal}>
					X
				</button>
				<form onSubmit={onNoteSubmit}>
					<div className="form-group">
						<textarea
							className="form-control"
							name="noteText"
							id="noteText"
							placeholder="Note Text"
							value={noteText}
							onChange={(e) => setNoteText(e.target.value)}
						></textarea>
					</div>
					<div className="form-group">
						<button className="btn" type="submit">
							Submit
						</button>
					</div>
				</form>
			</Modal>
		</div>
	);
}

export default Ticket;
