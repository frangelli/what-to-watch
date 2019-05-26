require 'rails_helper'

RSpec.describe Movie, type: :model do
  # Association Tests
  it { should belong_to(:movie_list) }
  # Validation Tests
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:imdb_id) }
end
