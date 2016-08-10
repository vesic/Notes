import React, { Component } from 'react';
import _ from 'lodash'
import ToolBar from './components/ToolBar'
import SideBar from './components/SideBar'
import Note from './components/Note'
import Header from './components/Header'
import request from 'superagent'

// let notes = require('./notes.json');
// console.log('these are', notes);

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
    .get('./notes.json')
    .end((err, res) => {
      this.setState({notes: res.body})
    })
  }

  onNoteSelect = (id) => {
    console.log(id);
    this.setState({
      selectedNote: _.find(this.state.notes, note => note.id === id)
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
      this.setState({
        notes: _.reject(this.state.notes, (note) => note.id === this.state.selectedNote.id),
        selectedNote: null
      }, () => console.log('filtered notes'))
    }
  }

  saveNote = (title, content) => {
    this.setState({
      notes: this.state.notes.concat([{title, content}]),
      selectedNote: null
    })
  }

  render() {
    return (
      <div>
        <Header />
        <ToolBar
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
