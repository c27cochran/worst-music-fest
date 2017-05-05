import React from 'react';
import EventForm from './EventForm';

const Edit = props =>
  <div>
    <EventForm editing id={props.routeParams.event} />
  </div>;

export default Edit;
