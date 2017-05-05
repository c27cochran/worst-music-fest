import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Menu, Container, Header, Image } from 'semantic-ui-react';
import styles from '../config/inline-styles';

export default class MenuBasic extends Component {

  handleItemClick = (e, { name }) => hashHistory.push(`/${name}`)

  render() {
    return (
      <div>
        <Menu className="main">
          <Container text>
            <Menu.Item>
              <Image src="public/img/small-logo.jpg" size="mini" />
            </Menu.Item>
            <Menu.Item
              name="schedule"
              onClick={this.handleItemClick}
            >
              Calendar View
            </Menu.Item>

            <Menu.Item
              name="list"
              onClick={this.handleItemClick}
            >
              List View
            </Menu.Item>

            <Menu.Item
              name="add"
              onClick={this.handleItemClick}
            >
              Add View
            </Menu.Item>
          </Container>
        </Menu>
        <Header as="h2" block style={styles.blockHeader}>
          <span>November 24, 2016 |</span>
          <span style={styles.blue}> Worst Music Fest</span>
        </Header>
      </div>
    );
  }
}
