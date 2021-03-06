class User < ApplicationRecord
  has_many :movie_lists

  validates_presence_of :name, :email
  validates_uniqueness_of :email
end
