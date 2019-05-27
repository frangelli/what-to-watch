require 'rails_helper'

RSpec.describe 'Users API', type: :request do
  # initialize test data
  let!(:user) { create(:user) }
  let(:user_id) { user.id }

  describe 'GET /users/:id' do
    before { get "/users/#{user_id}" }
    
    context 'when the user exists' do
      it 'returns the user' do
        expect(response.body).not_to be_empty
        expect(json['id']).to eq(user_id)
      end

      it 'returns status code of 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the user does not exist' do
      let(:user_id) { 100 }
      
      it 'should return status code of 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find User/)
      end
    end
  end

  describe 'POST /users' do
    let(:valid_attributes) { {name: 'Leonardo Frangelli', email: 'leonardo.frangelli@gmail.com'} }
    
    context 'when the request is valid' do
      before { post '/users', params: valid_attributes }

      it 'creates the user' do
        expect(json).to_not be_empty
      end

      it 'returns status code of 201' do 
        expect(response).to have_http_status(201)
      end
    end

    context 'when the user already exists' do
      before { post '/users', params: { name: user.name, email: user.email} }
      it 'returns existing user in case email already exists' do
        expect(json['id']).to eq(user_id)
      end

      it 'retusn status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the request is not valid' do
      before { post '/users', params: { name: 'Leonardo Frangelli'} }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Email can't be blank/)
      end
    end
    
  end

end