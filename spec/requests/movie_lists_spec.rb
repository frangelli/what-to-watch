require 'rails_helper'

RSpec.describe 'Movie Lists API', type: :request do
  # initialize test data
  let!(:user) { create(:user) }
  let!(:movie_lists) { create_list(:movie_list, 10, user: user) }
  let(:movie_list_id) { movie_lists.first.id }
  let(:user_id) { user.id }

  describe 'GET /users/:user_id/movie_lists' do
    before { get "/users/#{user_id}/movie_lists" }

    it 'returns movie_lists by user' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end

  end

  describe 'GET /users/:user_id/movie_lists/:movie_list_id' do
    before { get "/users/#{user_id}/movie_lists/#{movie_list_id}" }

    context 'when the record exists' do
      it 'returns the movie_list with movies' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(movie_list_id)
        expect(json['user_id']).to eq(user_id)
      end
      
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:movie_list_id) { 100 }
      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find MovieList/)
      end
    end
  end

  describe 'POST /users/:user_id/movie_lists' do
    let(:valid_attributes) { {name: 'My Terror Movies'} }

    context 'when the request is valid' do
      before { post "/users/#{user_id}/movie_lists", params: valid_attributes }

      it 'creates a movie_list' do
        expect(json['name']).to eq('My Terror Movies')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do

      before { post "/users/#{user_id}/movie_lists", params: {} }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Name can't be blank/)
      end
    end
  end

  describe 'PUT /users/:user_id/movie_lists/:id' do
    let(:valid_attributes) { {name: 'My Comedy Movies'} }

    context 'when the record exists' do
      before { put "/users/#{user_id}/movie_lists/#{movie_list_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  describe 'DELETE /users/:user_id/movie_lists/:id' do
    before { delete "/users/#{user_id}/movie_lists/#{movie_list_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end

end