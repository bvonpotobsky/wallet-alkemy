CREATE DATABASE wallet;

CREATE TABLE transactions(
  id SERIAL PRIMARY KEY,
  text VARCHAR(255),
  amount NUMERIC(15, 9),
  date DATE
);