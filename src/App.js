import React, { Component } from 'react';
import _ from 'lodash'
import ToolBar from './components/ToolBar'
import SideBar from './components/SideBar'
import Note from './components/Note'
import Header from './components/Header'
import request from 'superagent'

// let notes = require('./notes.json');
// console.log('these are', notes);

let notesUrl = 'http://localhost:3333';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      notes: [],
      selectedNote: null
    }
  }

  componentDidMount() {
    _.delay(this.getNotes, 2000);
  }

  getNotes = () => {
    request
    .get(notesUrl + '/notes')
    .end((err, res) => {
      this.setState({
        notes: res.body,
        selectedNote: null,
        filterNote: ''
      })
    })
  }

  onNoteSelect = (id) => {
    console.log(id);
    this.setState({
      selectedNote: _.find(this.state.notes, note => note._id === id)
    }, () => {
      // console.log(this.state.selectedNote);
    })
  }

  onDeleteNote = () => {
    if (this.state.selectedNote == null) {
      alert('No note selected');
      return;
    }

    if (confirm('Are you sure?')) {
      request
        .post(notesUrl + `/notes/${this.state.selectedNote._id}/delete`)
        .end((err, res) => {
          if (res.statusCode === 204) {
            this.getNotes();
          } else {
            // handle error
          }
        })
      // this.setState({
      //   notes: _.reject(this.state.notes, (note) => note.id === this.state.selectedNote.id),
      //   selectedNote: null
      // }, () => console.log('filtered notes'))
    }
  }

  saveNote = (title, content) => {
    request
      .post(notesUrl + '/notes/add')
      .send({title: title, content: content})
      .end((err, res) => {
        this.getNotes();
      })
    // this.setState({
    //   notes: this.state.notes.concat([{title, content}]),
    //   selectedNote: null
    // })
  }

  onFilterNotes = (filterNote) => {
    request
    .get(notesUrl + '/notes')
    .end((err, res) => {
      if (!err) {
        let notes = _.filter(res.body, n => _.startsWith(_.toLower(n.title), _.toLower(filterNote)));
        this.setState({notes})
      }
    })
  }

  render() {
    return (
      <div>
        <Header />
        <ToolBar
          onFilterNotes={this.onFilterNotes}
          onDeleteNote={this.onDeleteNote}
          saveNote={this.saveNote}
          />
        <div className='row'>
          <SideBar
            notes={this.state.notes}
            onNoteSelect={this.onNoteSelect}/>
          <Note selectedNote={this.state.selectedNote}/>
      </div>
      </div>
    );
  }
}

export default App;
