import React from 'react';
import ReactWidgets from 'react-widgets';
import moment from 'moment';
import dateFormat from 'dateformat';
import 'react-widgets/lib/less/react-widgets.less';
import {
  Message,
  Header,
  Icon,
  Card,
  Form,
  Dropdown,
  Button,
  Divider,
} from 'semantic-ui-react';
import { categoryOptions, featuredOptions } from '../config/options';
import styles from '../config/inline-styles';
import * as eventService from '../services/EventService';

// React widget stuff
const DateTimePicker = ReactWidgets.DateTimePicker;
const momentLocalizer = require('react-widgets/lib/localizers/moment');

momentLocalizer(moment);

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      error: false,
      error_message: '',
      submitted: false,
      deleted: false,
      deleted_message: '',
      title: '',
      description: '',
      start: null,
      end: null,
      category: '',
      featured: '',
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleFeaturedChange = this.handleFeaturedChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if (this.props.editing) {
      this.findProducts();
    }
  }

  findProducts() {
    const id = this.props.id;
    eventService.findById(id).then(data => {
      this.setState({
        event: data,
        start: new Date(data.startdate),
        end: new Date(data.enddate),
      });
    });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleStartChange(event, dt) {
    this.setState({ start: event });
  }

  handleEndChange(event, dt) {
    this.setState({ end: event });
  }

  handleCategoryChange = (e, {value}) => this.setState({category: value})

  handleFeaturedChange = (e, {value}) => this.setState({featured: value})

  handleSubmit(e) {
    e.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const startDate = this.state.start;
    const endDate = this.state.end;
    const category = this.state.category;
    const featured = this.state.featured;

    if (title !== '' && description !== '' && startDate !== null && endDate !== null && category !== '' && featured !== '') {
      const values = {
        title: title,
        description: description,
        startDate: dateFormat(startDate, "isoDateTime"),
        endDate: dateFormat(endDate, "isoDateTime"),
        category: category,
        featured: featured,
        updated: dateFormat(new Date(), "isoDateTime"),
      };

      if (this.props.editing) {
        const id = this.props.id;
        eventService.editById(id, values).then(data => {
          this.setState({ error: false, submitted: true, event: data });
        });
      } else {
        eventService.addEvent(values).then(data => {
          this.setState({ error: false, submitted: true, event: data });
        });
      }

    } else {
      this.setState({ error: true, error_message: 'All fields are required' });
    }
  }

  handleDelete(e) {
    e.preventDefault();
    const id = this.props.id;
    eventService.removeEvent(id).then(data => this.setState({ deleted: true, deleted_message: data.message }));
  }

  render() {
    const event = this.state.event;
    let datepickerStart = '';
    let datepickerEnd = '';
    let start = '';
    let end = '';
    let featured = '';

    if (event.startdate !== null && typeof event.startdate !== 'undefined') {
      start = new Date(this.state.event.startdate);
      end = new Date(this.state.event.enddate);
      featured = event.featured.toString();
    } else if (!this.props.editing) {
      start = new Date();
      end = new Date();
    } else {
      datepickerStart = '';
      datepickerEnd = '';
      featured = ''
    }

    datepickerStart = <DateTimePicker value={this.state.start} onChange={this.handleStartChange} name="startDate"/>;
    datepickerEnd = <DateTimePicker value={this.state.end} onChange={this.handleEndChange} name="endDate"/>;

    const errors = this.state.error
      ? <Message negative>
          <Message.Header>Error(s) in the form</Message.Header>
          <p>{this.state.error_message}</p>
        </Message>
      : '';

    let card;
    if (this.state.submitted) {
      const id = event.id;
      const link = `#/edit/${id}`;
      let featured = '';
      if (event.featured) {
        featured = (<Header as="h4">
          <Icon name="smile"/>
          <Header.Content>
            Featured!
          </Header.Content>
        </Header>);
      } else {
        featured = (<Header as="h4">
          <Icon name="frown"/>
          <Header.Content>
            Not Featured
          </Header.Content>
        </Header>);
      }
      card = <Card
              key={id}
              href={link}
              header={event.title}
              meta={event.category}
              description={event.description}
              extra={featured}
             />;
    }

    const header = this.props.editing
      ? <Header as="h2">Edit the {event.title} event</Header>
      : <Header as="h2">Add an event!</Header>;

    const deleteBtn = this.props.editing
      ? <Button fluid negative onClick={this.handleDelete}>Delete This Event</Button>
      : '';

    const deletedMsg = this.state.deleted
      ? <Message positive>
          <Message.Header>Deleted</Message.Header>
          <p>{this.state.deleted_message}</p>
        </Message>
      : '';

    return (
      <span>
        {deletedMsg}
        <div style={this.state.deleted
          ? styles.none
          : styles.block}>
          {card}
          <div style={this.state.submitted
            ? styles.none
            : styles.block}>
            {header}
            {errors}
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Title</label>
                <input value={this.state.title} onChange={this.handleTitleChange} name="title" placeholder={event.title} />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <input value={this.state.description} onChange={this.handleDescriptionChange} name="description" placeholder={event.description} />
              </Form.Field>
              <Form.Field>
                <label>Start Date</label>
                {datepickerStart}
              </Form.Field>
              <Form.Field>
                <label>End Date</label>
                {datepickerEnd}
              </Form.Field>
              <Form.Field>
                <label>Category</label>
                <Dropdown placeholder={event.category} fluid selection value={this.state.category} onChange={this.handleCategoryChange} name="category" options={categoryOptions} />
              </Form.Field>
              <Form.Field>
                <label>Featured</label>
                <Dropdown placeholder={featured} fluid selection value={this.state.featured} onChange={this.handleFeaturedChange} name="featured" options={featuredOptions} />
              </Form.Field>
              <Button type="submit">Submit</Button>
            </Form>
            <Divider section /> {deleteBtn}
          </div>
        </div>
      </span>
    );
  }
}

EventForm.propTypes = {
  editing: React.PropTypes.bool,
  id: React.PropTypes.string,
};

export default EventForm;
