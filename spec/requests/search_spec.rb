require 'rails_helper'

RSpec.describe 'Search API', type: :request do
  # initialize test data
  describe 'GET /search/search' do
    
    context 'with a valid query param' do
      before { get '/search/search?q=mission' }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns a valid response' do
        expect(json['Response']).to eq("True")
      end
    end

    context 'with a invalid or no query param' do
      before { get '/search/search?q=' }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns a valid response' do
        expect(json['Response']).to eq("False")
      end
    end
  end

  describe 'GET /search/find_by_imdb' do
    
    context 'with a valid query param' do
      before { get '/search/find_by_imdb?imdb_id=tt4912910' }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns a valid response' do
        expect(json['Response']).to eq("True")
      end
    end

    context 'with a invalid or no query param' do
      before { get '/search/find_by_imdb?i=' }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns a valid response' do
        expect(json['Response']).to eq("False")
      end
    end
  end


end