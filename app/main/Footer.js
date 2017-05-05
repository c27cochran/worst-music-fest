import React from 'react';
import { Segment, Header, Container, List, Grid, Image, Divider } from 'semantic-ui-react';
import styles from '../config/inline-styles';

const Footer = () =>
  <Segment vertical inverted className="footer" style={styles.footer}>
    <Container className="footer center aligned">
      <Grid divided stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <List link inverted>
              <List.Header>Group 1</List.Header>
              <List.Item as="a">Home</List.Item>
              <List.Item as="a">About</List.Item>
              <List.Item as="a">Jobs</List.Item>
              <List.Item as="a">Team</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <List link inverted>
              <List.Header>Group 2</List.Header>
              <List.Item as="a">Home</List.Item>
              <List.Item as="a">About</List.Item>
              <List.Item as="a">Jobs</List.Item>
              <List.Item as="a">Team</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <List link inverted>
              <List.Header>Group 3</List.Header>
              <List.Item as="a">Home</List.Item>
              <List.Item as="a">About</List.Item>
              <List.Item as="a">Jobs</List.Item>
              <List.Item as="a">Team</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4" inverted>Footer</Header>
            <p>Extra space for a call to action inside the
              footer that could help re-engage users.</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider inverted />
      <Image src="public/img/footer-logo.jpg" centered size="medium" />
      <List horizontal link inverted size="small">
        <List.Item as="a">Site Map</List.Item>
        <List.Item as="a">Contact Us</List.Item>
        <List.Item as="a">Terms and Conditions</List.Item>
        <List.Item as="a">Privacy Policy</List.Item>
      </List>
    </Container>
  </Segment>;

export default Footer;
