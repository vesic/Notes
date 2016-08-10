import React from 'react'
import Spinner from 'react-spinkit'
import _ from 'lodash';

const SideBar = (props) => {
  const { notes, onNoteSelect } = props;

  if (notes.length === 0) {
    return (
      <div className='col-xs-4'>
        <Spinner spinnerName='three-bounce'/>
      </div>
    )
  }

  return (
    <div className='col-xs-4'>
      <table
        style={{marginTop:10}}
        className="table table-hover">
        <tbody>
        {
          _.map(notes, (note) =>
            <tr
              onClick={ onNoteSelect.bind(null, note.id) }
              key={note.id}>
              <td>
                {note.title} <span className="pull-right label label-info">some time ago</span>
              </td>
            </tr>)
        }
        </tbody>
      </table>
    </div>
  )
}

export default SideBar
