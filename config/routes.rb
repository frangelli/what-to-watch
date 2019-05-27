Rails.application.routes.draw do
  get 'search/search'
  resources :users, only: [:create, :show] do
    resources :movie_lists do
      resources :movies
    end
  end
end
