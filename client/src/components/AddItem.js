import React, { Component } from 'react';

export default class AddItem extends Component {
  state = {
    item: '',
    editing: false,
    editedItem: ''
  };

  componentDidUpdate(prevProps) {
    if (this.props.editedBucketList !== prevProps.editedBucketList) {
      if (this.props.editedBucketList) {
        this.setState({
          editedItem: this.props.editedBucketList.name,
          editing: true
        });
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { item, editedItem, editing } = this.state;

    const { addBucketList, editBucketList, editedBucketList } = this.props;
    if (editing) {
      if (!editedItem) return;
      const updatedBucketList = Object.assign({}, editedBucketList, {
        name: editedItem
      });
      editBucketList(updatedBucketList);
      this.setState({ editedItem: '', editing: false });
      return;
    }
    if (!item) {
      return;
    }
    addBucketList(item);
    this.setState({ item: '' });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  stopEditing = () => {
    this.setState({ editing: false, editedItem: '' });
    this.props.cancelEditing();
  };

  render() {
    const { item, editedItem, editing } = this.state;
    const disabled = editing ? !editing : !item;

    return (
      <div className="add-item">
        <form action="" className="add-item_form" onSubmit={this.handleSubmit}>
          {editing ? (
            <input
              type="text"
              placeholder="Edit Item"
              value={editedItem}
              name="editedItem"
              onChange={this.handleChange}
            />
          ) : (
            <input
              type="text"
              name="item"
              placeholder="+  Add Item"
              value={item}
              onChange={this.handleChange}
            />
          )}
          {editing && (
            <i
              className="far fa-times-circle fa-2x"
              style={{ marginRight: 5 }}
              onClick={this.stopEditing}
            ></i>
          )}
          <button type="submit" disabled={disabled}>
            {editing ? 'Edit' : '+ Add'}
          </button>
        </form>
      </div>
    );
  }
}
