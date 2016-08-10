import React from 'react'

const Note = (props) => {
  const { selectedNote } = props;

  if (!selectedNote) {
    return (
      <div className='col-xs-8'>
        <h1 className='text-center well'>No note selected!</h1>
      </div>
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
