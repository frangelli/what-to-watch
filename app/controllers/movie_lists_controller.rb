class MovieListsController < ApplicationController
  before_action :set_user
  before_action :set_movie_list, only: [:show, :update, :destroy]

  def index
    @movie_lists = MovieList.where(user: @user)
    json_response(@movie_lists)
  end

  def show
    json_response(@movie_list)
  end

  def create
    @movie_list = @user.movie_lists.build(name: params[:name])
    @movie_list.save!
    json_response(@movie_list, :created)
  end

  def update
    @movie_list.update(movie_list_params)
    head :no_content
  end

  def destroy
    @movie_list.destroy
    head :no_content
  end

  private

  def movie_list_params
    params.permit(:name, :user_id)
  end

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_movie_list
    @movie_list = MovieList.find_by!(user: @user, id: params[:id])
  end
end
