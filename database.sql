-- CREATE DATABASE wallet;

CREATE TABLE transactions(
  id SERIAL PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  amount NUMERIC(11, 2) NOT NULL,
  date DATE
);