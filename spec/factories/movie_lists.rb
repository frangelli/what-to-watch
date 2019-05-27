FactoryBot.define do
  factory :movie_list do
    user
    name { Faker::Lorem.word }
  end
end