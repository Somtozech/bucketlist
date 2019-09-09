import React, { Component } from 'react';

export default class Tab extends Component {
  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const { activeTab, label } = this.props;

    let className = 'tab-list-item';

    if (activeTab === label) {
      className += ' tab-list-active';
    }

    return (
      <div className={className} onClick={this.onClick}>
        {label}
      </div>
    );
  }
}
