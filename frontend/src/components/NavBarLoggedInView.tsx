import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await NotesApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (<div style={{ display: 'flex', alignItems: 'center' }}>
        <Navbar.Text>
            Signed in as: {user.username}
        </Navbar.Text>
        <div style={{ marginLeft: '10px' }}>
            <Button variant="primary" onClick={logout}>Log out</Button>
        </div>
    </div>
    );
}

export default NavBarLoggedInView;
