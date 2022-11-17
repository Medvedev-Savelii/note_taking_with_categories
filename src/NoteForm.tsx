import { FormEvent, useRef, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "./App"
import { v4 as uuidV4 } from "uuid"

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>


export function NoteForm({
     onSubmit,
     onAddTag,
     availableTags,
     title = "",
     markdown = "",
     tags = [],}: NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate = useNavigate()
    return (
       <Form>
           <Stack gap={4}>
               <Row>
                   <Col>
                       <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required/>
                       </Form.Group>
                   </Col>
                   <Col>
                       <Form.Group controlId="tags">
                           <Form.Label>Tags</Form.Label>
                           <CreatableReactSelect
                               isMulti
                           />
                       </Form.Group>
                   </Col>
               </Row>
               <Form.Group controlId="markdown">
                   <Form.Label>Body</Form.Label>
                   <Form.Control
                       defaultValue={markdown}
                       required
                       as="textarea"
                       ref={markdownRef}
                       rows={15}
                   />
               </Form.Group>
               <Stack direction="horizontal" gap={2} className="justify-content-end">
                   <Button type="submit" variant="primary">
                       Save
                   </Button>
                   <Link to="..">
                       <Button type="button" variant="outline-secondary">
                           Cancel
                       </Button>
                   </Link>
               </Stack>
           </Stack>
       </Form>
    )
}