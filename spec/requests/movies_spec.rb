require 'rails_helper'

RSpec.describe 'Movies API', type: :request do
  # initialize test data
  let!(:user) { create(:user) }
  let(:user_id) { user.id }
  let!(:movie_list) { create(:movie_list, user: user) }
  let(:movie_list_id) { movie_list.id }
  let!(:movies) { create_list(:movie, 10, movie_list: movie_list) }
  let(:movie_id) { movies.first.id }

  describe 'GET /users/:user_id/movie_lists/:movie_list_id/movies' do
    before { get "/users/#{user_id}/movie_lists/#{movie_list_id}/movies" }

    it 'returns movies by movie_list' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns http status 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /users/:user_id/movie_lists/:movie_list_id/movies' do
    let!(:valid_attributes) { {title: "Mission: Impossible - Fallout", imdb_id: "tt4912910"} }

    context 'when the request is valid' do
      before { post "/users/#{user_id}/movie_lists/#{movie_list_id}/movies", params: valid_attributes }

      it 'creates the movie within the movie_list' do
        expect(response).to have_http_status(201)
        expect(json).to_not be_empty
      end

    end
  end

  describe 'DELETE /users/:user_id/movie_lists/:movie_list_id/movies/:id' do
    before { delete "/users/#{user_id}/movie_lists/#{movie_list_id}/movies/#{movie_id}" }

    it 'removes the movie from the movie_lsit' do
      expect(response).to have_http_status(204)
    end
  end

end