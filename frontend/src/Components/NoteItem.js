import {React, useContext} from 'react'
import noteContext from '../Context/Notes/NoteContext';


const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    const handleClick = () => {
        deleteNote(note._id)
        console.log("Click")
        props.showAlert("Deleted Successfully", "success")
    }

    const handleEdit = () => {
        updateNote(note)

    }

    return (
        <div className="col-sm-4">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        
                    </div>
                    <pre className="card-text">{note.description}</pre>
                    <button className="btn btn-outline-danger m-2" type='button' style={{fontSize:'11px', width:'100px'}} onClick={handleClick}>DELETE</button>
                    <button className="btn btn-outline-primary m-2" type='button' style={{fontSize:'11px', width:'100px'}} onClick={handleEdit} >EDIT</button>
                    <span className='m-2' style={{color:'rgba(0,0,0,0.5)'}}>{note.tag}</span>
                </div>
            </div>
        </div>
    )
}

export default NoteItem