import { Note as NoteModel } from "../models/note";
import Card from "react-bootstrap/Card";
import styles from "../styles/Note.module.css";

interface NoteProps {
    note: NoteModel,
}

const Note = ({ note }: NoteProps) => {
    const {
        title,
        text,
        createdAt,
        updatedAt
    } = note;

    return (<Card className={styles.noteCard}>
        <Card.Body>
            <Card.Title>
                {title}
            </Card.Title>
            <Card.Text>
                {text}
            </Card.Text>
        </Card.Body>
    </Card>)
}

export default Note;