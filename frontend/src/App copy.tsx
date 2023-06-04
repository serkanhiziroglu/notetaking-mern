import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Note as NoteModel } from './models/note';
import { Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import * as NotesApi from "./network/notes_api";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styleUtils from "./styles/utils.module.css";
import Note from './components/Note';
import AddNoteDialog from './components/AddEditNoteDialog';
import { FaPlus } from 'react-icons/fa';
import AddEditNoteDialog from './components/AddEditNoteDialog';
import SignUpModal from './components/SignUpModal';
import NavBar from './components/NavBar';

function App() {
	const [notes, setNotes] = useState<NoteModel[]>([]);
	const [notesLoading, setNotesLoading] = useState(true)
	const [showNotesLoadingError, setShowNotesLoadingError] = useState(false)

	const [showAddNoteDialog, setshowAddNoteDialog] = useState(false);
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

	useEffect(() => {
		async function loadNotes() {
			try {
				setShowNotesLoadingError(false)
				setNotesLoading(true)
				const notes = await NotesApi.fetchNotes();
				setNotes(notes);
			} catch (error) {
				console.error(error);
				setShowNotesLoadingError(true)
			} finally {
				setNotesLoading(false)
			}
		}

		loadNotes();
	}, []);

	async function deleteNote(note: NoteModel) {
		try {
			await NotesApi.deleteNote(note._id);
			setNotes(notes.filter(existingNote => existingNote._id !== note._id));
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}

	const notesGrid = <div className={`g-4 ${styles.noteGrid}`} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
		{
			notes.map(note => (
				<div key={note._id} >
					<Note note={note} className={styles.note} onNoteClicked={setNoteToEdit} onDeleteNodeClicked={deleteNote} />
				</div>
			))
		}
	</div >
	return (
		<div>
			<NavBar
				loggedInUser={null}
				onLoginClicked={() => { }}
				onSignUpClicked={() => { }}
				onLogoutSuccessful={() => { }}

			/>
			<Container className={styles.NotesPage}>
				<Button className={`mb-4 mt-3 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`} onClick={() => setshowAddNoteDialog(true)}>
					<FaPlus />
					Add new note
				</Button>
				{notesLoading && <Spinner animation='border' variant='primary' />}
				{showNotesLoadingError && <p>Something went wrong, please refresh the page.</p>}
				{!notesLoading && !showNotesLoadingError && <>
					{notes.length > 0
						? notesGrid
						: <p>You don't have any notes yet</p>}
				</>}
				{showAddNoteDialog && (
					<AddNoteDialog
						onDismiss={() => setshowAddNoteDialog(false)}
						onNoteSaved={(newNote) => {
							setNotes([...notes, newNote]);
							setshowAddNoteDialog(false);
						}}
					/>
				)}
				{noteToEdit && (
					<AddEditNoteDialog
						noteToEdit={noteToEdit}
						onDismiss={() => setNoteToEdit(null)}
						onNoteSaved={(updatedNote) => {
							setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
							setNoteToEdit(null);
						}}
					/>
				)}


			</Container></div>
	);
}

export default App;
