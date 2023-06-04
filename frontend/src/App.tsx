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
import { User } from './models/user';
import LoginModal from './components/LoginModal';
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';

function App() {

	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);


	useEffect(() => {
		async function fetchLoggedInUser() {
			try {
				const user = await NotesApi.getLoggedInUser();
				setLoggedInUser(user);
			} catch (error) {
				console.error(error);
			}
		}
		fetchLoggedInUser();
	}, []);


	return (
		<div>
			<NavBar
				loggedInUser={loggedInUser}
				onLoginClicked={() => setShowLoginModal(true)}
				onSignUpClicked={() => setShowSignUpModal(true)}
				onLogoutSuccessful={() => setLoggedInUser(null)}

			/>
			<Container className={styles.NotesPage}>
				<>{loggedInUser
					? <NotesPageLoggedInView />
					: <NotesPageLoggedOutView />
				}
				</>


			</Container>

			{showSignUpModal &&
				<SignUpModal
					onDismiss={() => setShowSignUpModal(false)}
					onSignUpSuccessful={(user) => {
						setLoggedInUser(user);
						setShowSignUpModal(false);
					}}
				/>
			}
			{showLoginModal &&
				<LoginModal
					onDismiss={() => setShowLoginModal(false)}
					onLoginSuccessful={(user) => {
						setLoggedInUser(user);
						setShowLoginModal(false);
					}}
				/>
			}
		</div>
	);
}

export default App;
