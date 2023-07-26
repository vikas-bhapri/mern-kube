import { React, useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/Notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import {useNavigate} from 'react-router-dom'


const Notes = (props) => {
    let navigate = useNavigate()
    const context = useContext(noteContext);
    const { getNotes, notes, editNote } = context
    const [note, setNote] = useState({id:'', etitle:'', edescription:'', etag:''})

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        } else{
            navigate('/login')
        }
    }, [getNotes, navigate])

    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
        
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: [e.target.value]})
    }

    const handleClick = (e) => {
        console.log('updating the note')
        editNote(note.id.toString(), note.etitle.toString(), note.edescription.toString(), note.etag.toString())
        refClose.current.click();
        props.showAlert("Updated Successfully", "success")
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.etitle} id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea style={{resize:'none'}} rows="5" type="text" className="form-control" value={note.edescription} id="edescription" name='edescription' onChange={onChange} ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.etag} id="etag" name='etag' onChange={onChange} />
                                </div>

                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Save Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 style={{marginTop:'100px'}}>Your Notes</h2>
                <div className="row my-3">
                    <h4 style={{textAlign:'center', color: 'rgba(0,0,0,0.6)'}}>
                        {notes.length === 0 && 'No notes to display'}
                    </h4>
                    {notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                    })}
                </div>

            </div>
        </>
    )
}

export default Notes