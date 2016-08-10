import React from 'react'

class AddNoteModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: ''
    }
  }

  onSaveNote = () => {
    this.props.saveNote(this.state.title, this.state.content);

    this.setState({
      title: '',
      content: ''
    })
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

  handleContentChange = (event) => {
    this.setState({content: event.target.value});
  }

  render () {
    return (
      <div>
        <span><strong style={{fontSize: '1.5em'}}>Notes:</strong></span>
        <button type="button" className="btn btn-primary btn-sm pull-right" data-toggle="modal" data-target="#myModal">
          +
        </button>
        <div id='myModal' className="modal fade" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">Add Note</h4>
              </div>
              <div className="modal-body">
                <div>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      value={this.state.title}
                      onChange={this.handleTitleChange}
                      className="form-control"
                      id="title"
                      placeholder="Title" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                      value={this.state.content}
                      onChange={this.handleContentChange}
                      className="form-control"
                      id='content'
                      rows="3"
                      placeholder='Content' />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  disabled={this.state.title === '' || this.state.content === ''}
                  onClick={this.onSaveNote}
                  className="btn btn-primary"
                  data-dismiss="modal"
                >Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddNoteModal;
