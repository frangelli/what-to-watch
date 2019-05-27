FactoryBot.define do
  factory :movie do
    movie_list
    title { Faker::Lorem.word }
    imdb_id { Faker::Alphanumeric.alpha 10 }
  end
end