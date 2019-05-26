class Movie < ApplicationRecord
  belongs_to :movie_list

  validates_presence_of :title, :imdb_id
end
