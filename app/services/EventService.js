import request from './Request';

export const findAll = (values) => {
  let qs = '';
  if (values) {
    qs = Object.keys(values).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(values[key])}`).join('&');
    qs = `?${qs}`;
  }
  return request({
    url: `/events${qs}`,
  })
  .then(data => JSON.parse(data));
};

export const findById = id => request({ url: `/events/${id}` }).then(data => JSON.parse(data));

export const editById = (id, values) => {
  let qs = '';
  if (values) {
    qs = Object.keys(values).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(values[key])}`).join('&');
    qs = `?${qs}`;
  }
  return request({
    url: `/events/${id}${qs}`,
    method: 'PUT',
  })
  .then(data => JSON.parse(data));
};

export const addEvent = (values) => {
  let qs = '';
  if (values) {
    qs = Object.keys(values).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(values[key])}`).join('&');
    qs = `?${qs}`;
  }
  return request({
    url: `/events${qs}`,
    method: 'POST',
  })
  .then(data => JSON.parse(data));
};

export const removeEvent = id => request({ url: `/events/${id}`, method: 'DELETE' }).then(data => JSON.parse(data));
