import { React, useContext, useState } from 'react'
import noteContext from '../Context/Notes/NoteContext';

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context
    const [note, setNote] = useState({ title: '', description: '', tag: '' })

    const handleClick = (e) => {
        e.preventDefault()
        // console.log(note.title, note.description, note.tag)
        addNote(note.title.toString(), note.description.toString(), note.tag.toString())
        setNote({ title: '', description: '', tag: '' })
        props.showAlert("Note added successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: [e.target.value] })
    }

    return (
        <div>
            <h2>
                Add a note
            </h2>

            <form className='my-3' autoComplete='off'>
                <div className="row mb-3">
                    <label htmlFor="title" className="form-label col-sm-4 credLabel">Title</label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" id="title" placeholder='Enter note title' name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="description" className="form-label col-sm-4 credLabel">Description</label>
                    <div className="col-sm-4">
                        <textarea style={{ resize: 'none' }} type="text" rows={5} placeholder='Enter description' className="form-control" value={note.description} id="description" name='description' onChange={onChange} ></textarea>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="tag" className="form-label col-sm-4 credLabel">Tag</label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" id="tag" value={note.tag} placeholder='Enter category' name='tag' onChange={onChange} />
                    </div>
                </div>

                <button type="submit" id='signupBtn' className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote