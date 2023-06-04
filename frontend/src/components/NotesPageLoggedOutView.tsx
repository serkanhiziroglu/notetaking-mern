const textStyle = {
    display: 'flex',
    margin: '2',
    justifyContent: 'center',
    alignItems: 'center',
    height: '15vh',
    fontSize: '1.2em', // Increase the font size more to make it bigger
};
const NotesPageLoggedOutView = () => {
    return (
        <div style={textStyle}>Please login to see your notes.</div>
    );
}

export default NotesPageLoggedOutView;