import React, { Component } from 'react';
import './App.css';
import BucketList from './components/BucketList';
import Search from './components/search';
import AddItem from './components/AddItem';
import Auth from './components/auth';

import Client from './utils/helper';

class App extends Component {
  state = {
    bucketlists: [],
    editedBucketList: null,
    isLoggedIn: false,
    loading: true,
    error: false
  };

  componentDidMount() {
    this.getBucketLists();
  }

  handleError() {
    this.setState({ error: true, loading: false });
    setTimeout(() => {
      this.setState({ error: false });
    }, 1000);
  }

  getBucketLists() {
    if (!Client.isLoggedIn()) return;
    // this.setState({ loading: true });
    Client.getBucketLists()
      .then(bucketlists => {
        this.setState({ bucketlists, loading: false });
      })
      .catch(error => {
        console.log(error);
        this.handleError();
      });
  }

  handleSearch = query => {
    this.setState({ loading: true, error: false });
    Client.search(query)
      .then(bucketlists => {
        this.setState({ bucketlists, loading: false });
      })
      .catch(error => this.handleError());
  };

  addBucketList = name => {
    Client.createBucketList({ name })
      .then(bucketlist => {
        const { bucketlists } = this.state;
        this.setState({ bucketlists: [bucketlist, ...bucketlists] });
      })
      .catch(error => this.handleError());
  };

  deleteBucketList = id => {
    Client.deleteBucketList(id)
      .then(bucketlist => {
        console.log(bucketlist);
        this.getBucketLists();
      })
      .catch(error => this.handleError());
  };

  setEditedBucketList = item => {
    this.setState({ editedBucketList: item });
  };

  cancelEditing = () => {
    this.setState({ editedBucketList: null });
  };
  editBucketList = item => {
    this.cancelEditing();
    Client.editBucketList(item)
      .then(() => {
        this.getBucketLists();
      })
      .catch(error => this.handleError());
  };
  logout = e => {
    e.preventDefault();
    Client.logout();
    this.setState({
      error: false,
      isLoggedIn: false
    });
  };

  handleLogin = () => {
    this.getBucketLists();
  };

  render() {
    const { bucketlists, editedBucketList, loading, error } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div>
            <h5 class="brand">Bucket List</h5>
            <span class="brand-tiny">Create your bucket list</span>
          </div>
          {Client.isLoggedIn() && (
            <a href="#aa" onClick={this.logout}>
              logout
            </a>
          )}
        </header>

        {Client.isLoggedIn() ? (
          <React.Fragment>
            <Search handleSearch={this.handleSearch}></Search>
            <AddItem
              addBucketList={this.addBucketList}
              editedBucketList={editedBucketList}
              editBucketList={this.editBucketList}
              cancelEditing={this.cancelEditing}
            ></AddItem>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px 0'
              }}
            >
              {loading && (
                <span
                  style={{
                    color: '#01d28e',
                    fontStyle: 'italic',
                    fontSize: 14
                  }}
                >
                  Fetching Bucket Lists...
                </span>
              )}
              {error && (
                <span
                  style={{
                    color: '#c70d3a',
                    fontStyle: 'italic',
                    fontSize: 14
                  }}
                >
                  An Error Occured. Check Internet Connection or Try again!
                </span>
              )}
            </div>

            <BucketList
              items={bucketlists}
              deleteBucketList={this.deleteBucketList}
              setEditedBucketList={this.setEditedBucketList}
            ></BucketList>
          </React.Fragment>
        ) : (
          <Auth handleLogin={this.handleLogin}></Auth>
        )}
      </div>
    );
  }
}

export default App;
