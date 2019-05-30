class SearchController < ApplicationController

  # yep.. I know it should be coming from an ENV variable
  # but let's keep it simple for this app
  MOVIES_API_BASE_URL='http://www.omdbapi.com/?apikey=6a4684e9'
  
  def search
    query = params[:q].html_safe if params[:q].present?
    response = HTTParty.get("#{MOVIES_API_BASE_URL}&s=#{query}")
    json_response(response, :ok)
  end

  def find_by_imdb
    query = params[:imdb_id].html_safe if params[:imdb_id].present?
    response = HTTParty.get("#{MOVIES_API_BASE_URL}&i=#{query}")
    json_response(response, :ok)
  end

  private
  def search_params
    params.permit(:q, :imdb_id)
  end
end
