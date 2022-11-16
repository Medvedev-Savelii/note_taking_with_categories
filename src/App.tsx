import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from "react"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate } from "react-router-dom"
import NoteList from "./NoteList";
import {NewNote} from "./NewNote";
import Note from "./Note";
import EditNote from "./EditNote";
import {useLocalStorage} from "./useLocalStorage";


export type Note = {
    id: string
} & NoteData

export type RawNote = {
    id: string
} & RawNoteData

export type RawNoteData = {
    title: string
    markdown: string
    tagIds: string[]
}

export type NoteData = {
    title: string
    markdown: string
    tags: Tag[]
}

export type Tag = {
    id: string
    label: string
}


function App() {
    const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
    const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])
  return (
      <Container className="my-4">
          <Routes>
              <Route
                  path="/"
                  element={
                      <NoteList
                      />
                  }
              />
              <Route
                  path="/new"
                  element={
                      <NewNote
                       availableTags={tags}/>
                  }
              />
              <Route path="/:id">
                  <Route index element={<Note/>} />
                  <Route
                      path="edit"
                      element={
                          <EditNote/>
                          }
                          />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </Container>
  );
}

export default App;
