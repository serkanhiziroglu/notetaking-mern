import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Note as NoteModel } from './models/note'

import Note from './components/Note'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  useEffect(() => {
    async function loadNotes() {
      console.log('im here')
      try {
        const response = await fetch('/api/notes', { method: 'GET' })
        const notes = await response.json()
        setNotes(notes)
      } catch (error) {
        console.error(error)
        alert(error)
      }

    }
    loadNotes()
  }, [])

  return (
    <div>
      {notes.map(note => (
        <Note note={note} key={note._id} />
      ))}
    </div>
  );
}

export default App;