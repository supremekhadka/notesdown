'use client'

import '../scribble-btn.css';
import '../Btn.css';
import { Inter, Gochi_Hand } from 'next/font/google';
import { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify'

const gochiHand = Gochi_Hand({ subsets: ["latin"], weight: ['400'] });

export default function NotesPage() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [notes, setNotes] = useState<Array<string | null>>([]);
  const [editedNoteIndex, setEditedNoteIndex] = useState<number | null>(null);
  const [editedNote, setEditedNote] = useState('');
  const [noteRotations, setNoteRotations] = useState<number[]>([]);

  const sanitizeContent = (content: string) => {
    return DOMPurify.sanitize(content);
  };

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement> | KeyboardEvent) => {
    if (e instanceof KeyboardEvent) {
      e.preventDefault();
    }
  
    let sanitizedNote = sanitizeContent(editedNote);
    if (editedNoteIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editedNoteIndex] = editedNote;
      setNotes(updatedNotes.filter(note => note !== null) as string[]);
    } else {
      if (typeof window !== 'undefined') {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = editedNote;
        sanitizedNote = tempDiv.textContent || tempDiv.innerText || '';
        setNotes([...notes, sanitizedNote]);
      }
    }
    setShowOverlay(false);
  }, [notes, editedNoteIndex, editedNote]);  

  useEffect(() => {
    const savedNotesString = localStorage.getItem('notes');
    if (savedNotesString) {
      const savedNotes = JSON.parse(savedNotesString);
      setNotes(savedNotes);
    } else {
      setNotes([]);
    }
  }, []);
  

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const calculatedRotations = notes.map(() => getRandomRotation());
    setNoteRotations(calculatedRotations);
  }, [notes]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (showOverlay && event.ctrlKey && event.key === 'Enter') {
          handleSubmit(event);
        }
      };
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleSubmit, showOverlay]);
  
  

  const handleAddNote = () => {
    setShowOverlay(true);
    setEditedNote('');
    setEditedNoteIndex(null);
  };

  const handleEditNote = (index: number) => {
    const sanitizedContent = sanitizeContent(notes[index] ?? '');
    setEditedNoteIndex(index);
    setEditedNote(sanitizeContent);
    setShowOverlay(true);
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const getRandomRotation = () => {
    return Math.floor(Math.random() * 5) - 3; // Random number between -15 to 15
  };

  return (
    <div className={`z-10 min-h-full sm:min-h-full h-auto flex flex-col items-center`}>
      <h1 className="text-[1.7em] sm:mt-2 sm:static absolute top-10 font-semibold">Notes</h1>
      <div className="z-20 fixed bottom-5 right-5 transform flex flex-col items-center">
        <button className="relative scribble-btn" onClick={handleAddNote}>
          <span>Scribble</span>  
        </button>
      </div>
      {showOverlay && (
        <div className="fixed z-20 top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center">
          <div className=" p-8 rounded-md">
            <form className='flex flex-col items-center' onSubmit={handleSubmit}>
              {/* <textarea name="note" rows={10} cols={40} className={`w-full ${gochiHand.className} outline-none bg-black text-cyan-50 text-2xl mb-4`} value={editedNote} onChange={(e) => setEditedNote(e.target.value)}></textarea> */}
              <ReactQuill 
                value={editedNote} 
                theme='snow'
                formats={['clean']}
                onChange={(value) => setEditedNote(value)} 
                className={`sm:w-full w-screen ${gochiHand.className} sm:h-72 h-[60vh] outline-none bg-black text-cyan-50 text-2xl mb-4`} 
              />
              <button type='submit' className="SaveBtn mt-16">
                Save
                <svg className='Savesvg svg bi bi-save2-fill' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v6h-2a.5.5 0 0 0-.354.854l2.5 2.5a.5.5 0 0 0 .708 0l2.5-2.5A.5.5 0 0 0 10.5 7.5h-2v-6z"/> </svg>
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="flex flex-wrap justify-center mt-5">
      {[...notes].reverse().map((note, index)  => (
          <div
            style={{ transform: `rotate(${noteRotations[index]}deg)` }}
            key={index}
            className="flex flex-col items-center justify-center relative text-slate-950 bg-gray-200 rounded-md m-4 p-10"
          >
            <div className={`${gochiHand.className} text-xl max-w-[50vw] text-ellipsis overflow-hidden mb-5`}>{note}</div>
            <div className="mt-2 flex gap-4 justify-center bottom-5">
              <button onClick={() => handleEditNote(notes.length - 1 - index)} className="Btn">
                Edit
                <svg viewBox="0 0 512 512" className="svg">
                  <path
                    d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                  ></path>
                </svg>
              </button>
              <button onClick={() => handleDeleteNote(notes.length - 1 - index)} className="DltBtn">
                Delete
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi Dltsvg bi-trash-fill" viewBox="0 0 16 16"> <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/> </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
