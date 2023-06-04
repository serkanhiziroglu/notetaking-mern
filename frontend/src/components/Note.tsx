import { Note as NoteModel } from '../models/note';
import Card from 'react-bootstrap/Card';
import styles from '../styles/Note.module.css';
import { formatDate } from '../utils/formatDate';
import { MdDelete } from 'react-icons/md';
import styleUtils from '../styles/utils.module.css';

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNodeClicked: (node: NoteModel) => void;
  className?: string;
}

const Note = ({
  note,
  onNoteClicked,
  onDeleteNodeClicked,
  className,
}: NoteProps) => {
  console.log(note);
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = 'Updated: ' + formatDate(updatedAt);
  } else {
    createdUpdatedText = 'Created: ' + formatDate(createdAt);
  }

  return (
    <Card
      className={`${styles.noteCard} ${className}`}
      onClick={() => onNoteClicked(note)}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            className='text-muted ms-auto'
            onClick={(e) => {
              onDeleteNodeClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className={styles.cardFooter}>
        {createdUpdatedText}
      </Card.Footer>
    </Card>
  );
};

export default Note;
