import React from 'react'
import Spinner from 'react-spinkit'
import _ from 'lodash';
import moment from 'moment';

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
              onClick={ onNoteSelect.bind(null, note._id) }
              key={note._id}>
              <td>
                {note.title} <span className="pull-right label label-info">{moment(note.date).fromNow()}</span>
              </td>
            </tr>)
        }
        </tbody>
      </table>
    </div>
  )
}

export default SideBar
