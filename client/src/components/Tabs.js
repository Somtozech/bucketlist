import React, { Component } from 'react';
import Tab from './Tab';

export default class Tabs extends Component {
  state = {
    activeTab: this.props.children[0].props.label
  };

  onClickTabItem = tab => {
    this.setState({ activeTab: tab });
  };
  render() {
    const { children } = this.props;
    const { activeTab } = this.state;
    return (
      <div className="tabs">
        <div className="tab-list">
          {children.map(child => {
            const { label } = child.props;
            return (
              <Tab
                activeTab={activeTab}
                label={label}
                key={label}
                onClick={this.onClickTabItem}
              ></Tab>
            );
          })}
        </div>
        <div className="tab-content">
          {children.map(child => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}
