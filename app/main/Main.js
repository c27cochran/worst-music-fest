import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import Menu from './Menu';
import Footer from './Footer';
import styles from '../config/inline-styles';

const Main = props =>
  <div>
    <div className="ui main text container">
      <Image src="public/img/fest-logo.jpg" size="big" centered />
    </div>
    <Menu />
    <Container text style={styles.containerStyles}>
      {props.children}
    </Container>
    <Footer />
  </div>;

export default Main;
