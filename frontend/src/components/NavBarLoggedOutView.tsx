import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked }: NavBarLoggedOutViewProps) => {

    return (
        <>
            <Button
                style={{
                    backgroundColor: '#808080',
                    color: '#FFFFFF',
                    border: 'none',
                    marginRight: '10px', // Added margin to the right
                }}
                onClick={onSignUpClicked}
            >
                Sign Up
            </Button>
            <Button
                style={{
                    backgroundColor: '#808080',
                    color: '#FFFFFF',
                    border: 'none',
                }}
                onClick={onLoginClicked}
            >
                Log In
            </Button>
        </>
    );

}

export default NavBarLoggedOutView;