import React from 'react';
import { Header, Card, Icon, Divider } from 'semantic-ui-react';
import * as eventService from '../services/EventService';

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    this.findProducts();
  }

  findProducts() {
    eventService.findAll().then(data => this.setState({ events: data.events }));
  }

  render() {
    const cards = this.state.events.map((event) => {
      const id = event.id;
      const link = `#/edit/${id}`;
      let featured = '';
      if (event.featured) {
        featured = (<Header as="h4">
          <Icon name="smile" />
          <Header.Content>
            Featured!
          </Header.Content>
        </Header>);
      } else {
        featured = (<Header as="h4">
          <Icon name="frown" />
          <Header.Content>
            Not Featured
          </Header.Content>
        </Header>);
      }

      return <Card
              key={id}
              href={link}
              header={event.title}
              meta={event.category}
              description={event.description}
              extra={featured}
             />;
    });

    return (
      <div>
        <Header as="h2">Event List</Header>
        <Divider section />
        <Header as="h4">Click an event to edit</Header>
        <Card.Group>
          {cards}
        </Card.Group>
      </div>
    );
  }
}

export default List;
