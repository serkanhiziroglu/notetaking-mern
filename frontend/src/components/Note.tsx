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
  const { title, text, createdAt, updatedAt, priority } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = 'Updated: ' + formatDate(updatedAt);
  } else {
    createdUpdatedText = 'Created: ' + formatDate(createdAt);
  }

  let priorityClass = '';
  if (priority >= 3) {
    priorityClass = styles.lowPriority;
  }
  if (priority >= 6 && priority >= 4) {
    priorityClass = styles.mediumPriority;
  }
  if (priority >= 7) {
    priorityClass = styles.highPriority;
  }

  return (
    <Card
      className={`${styles.noteCard} ${priorityClass} ${className}`}
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
