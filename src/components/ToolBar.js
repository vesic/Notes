import React from 'react'
import AddNoteModal from './AddNoteModal'

const ToolBar = (props) => {
  const { onDeleteNote, saveNote, onFilterNotes } = props;

  return (
    <div className='row'>
      <div className='col-xs-4'>
        <AddNoteModal saveNote={saveNote} onFilterNotes={onFilterNotes}/>
      </div>
      <div className='col-xs-8'>
        <button
          onClick={onDeleteNote}
          className='btn btn-danger btn-sm glyphicon glyphicon-trash pull-right'>
        </button>
      </div>
    </div>
  )
}

export default ToolBar
