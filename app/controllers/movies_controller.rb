class MoviesController < ApplicationController
  before_action :set_user
  before_action :set_movie_list
  before_action :set_movie, only: [:destroy]

  def index
    @movies = @movie_list.movies
    json_response(@movies)
  end

  def create
    @movie = @movie_list.movies.find_by(imdb_id: params[:imdb_id])
    if (@movie.present?) 
      json_response(@movie, :ok)
    else
      @movie = @movie_list.movies.build(movie_params)
      @movie.save!
      json_response(@movie, :created)
    end
  end

  def destroy
    @movie.destroy
    head :no_content
  end

  private
  def movie_params
    params.permit(:title, :imdb_id, :poster_url)
  end

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_movie_list
    @movie_list = @user.movie_lists.find(params[:movie_list_id])    
  end

  def set_movie
    @movie = @movie_list.movies.find(params[:id])
  end
end
