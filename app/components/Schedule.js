import React from 'react';
import { Header } from 'semantic-ui-react';
import { hashHistory } from 'react-router';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import * as eventService from '../services/EventService';

BigCalendar.momentLocalizer(moment);

class Schedule extends React.Component {

  constructor() {
    super();
    this.state = {
      events: [],
      calArray: [],
    };
  }

  componentDidMount() {
    this.findProducts();
  }

  findProducts() {
    const eventArray = [];
    eventService.findAll().then((data) => {
      this.setState({ events: data.events });

      data.events.map(function (element) {
        const obj = {
          title: element.title,
          start: new Date(element.startdate),
          end: new Date(element.enddate),
          id: element.id,
        };
        eventArray.push(obj);
      });
      this.setState({ calArray: eventArray });
    });
  }

  render() {
    const minD = new Date();
    const maxD = new Date();
    const min = new Date(minD.setHours(12, 0, 0, 0));
    const max = new Date(maxD.setHours(20, 0, 0, 0));

    return (
      <div>
        <Header as="h2">Event Schedule</Header>
        Click a band to edit
        <BigCalendar
          events={this.state.calArray}
          min={min}
          max={max}
          step={15}
          timeslots={4}
          defaultView="day"
          defaultDate={new Date('11/24/2016')}
          onSelectEvent={event => hashHistory.push(`edit/${event.id}`)}
        />
      </div>
    );
  }
}

export default Schedule;
