import React, { PropTypes } from 'react'

const Note = (props) => {
  const { selectedNote } = props;

  if (!selectedNote) {
    return (
      <h2>No note selected</h2>
    )
  }

  return (
    <div className='col-xs-8'>
      <div
        style={{ marginTop:10 }}
        className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{ selectedNote.title }</h3>
        </div>
        <div className="panel-body">
          { selectedNote.content }
        </div>
      </div>
    </div>
  )
}

export default Note
