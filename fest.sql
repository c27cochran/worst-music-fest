
DROP DATABASE IF EXISTS worst_music_fest;
CREATE DATABASE worst_music_fest;

\c worst_music_fest;

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  startDate TIMESTAMP,
  endDate TIMESTAMP,
  category VARCHAR,
  description TEXT,
  featured BOOLEAN,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO events (title, startDate, endDate, category, description, featured) VALUES ('Nickleback', '2016-11-24 14:00:00', '2016-11-24 15:00:00', 'Rock', 'Rock and roll cliche heroes, Nickleback take the stage!', FALSE);
INSERT INTO events (title, startDate, endDate, category, description, featured) VALUES ('Creed', '2016-11-24 15:00:00', '2016-11-24 16:00:00', 'Rock','Have a Scott Stapp-tacular time as these rock gods blow your face off!', FALSE);
INSERT INTO events (title, startDate, endDate, category, description, featured) VALUES ('Hanson', '2016-11-24 16:00:00', '2016-11-24 17:00:00', 'Pop','MMMBOP! These boys are back as our headliner!', TRUE);

