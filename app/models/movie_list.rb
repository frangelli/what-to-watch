class MovieList < ApplicationRecord
  belongs_to :user
  has_many :movies, dependent: :destroy

  validates_presence_of :name, :user
end
