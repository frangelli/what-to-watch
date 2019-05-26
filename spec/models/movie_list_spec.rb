require 'rails_helper'

RSpec.describe MovieList, type: :model do
  # Association Test
  it { should belong_to(:user)}
  it { should have_many(:movies).dependent(:destroy) }
  # Validation Tests
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:user) }
end
