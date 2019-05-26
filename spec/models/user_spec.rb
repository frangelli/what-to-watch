require 'rails_helper'

RSpec.describe User, type: :model do
  # Association Tests
  it { should have_many(:movie_lists) }
  # Validation Tests
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
end
