# WHAT TO WATCH [LIVE DEMO](https://salty-eyrie-81503.herokuapp.com)

Movies and TV Show search engine with lists creation feature.

## Tech

### Backend

For backend it uses Ruby on Rails ( API only ) with Postgres database and RSpec for testing.

### Frontend

For frontend it uses React + Redux + Webpack

## Running it locally

### clone the repo and from the root directory run:

- `bundle install`
- `rails db:create` (assuming you have postgres installed)
- `rails db:migrate`
- `rails s`

### Running backend tests

It has unit tests and request tests.

`bundle exec rspec`

## To build a new frontend version

`cd frontend && npm install && npm run build`
