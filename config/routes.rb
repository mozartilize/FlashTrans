Rails.application.routes.draw do
  # devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json},
                  constraints: {subdomain: 'api'}, path: '/' do
    scope module: :v1 do
      mount_devise_token_auth_for(
        'User', at: 'auth', skip: [:omniauth_callbacks],
                controllers: {
                  registrations: 'api/v1/users'
                }
      )
      devise_scope :api_user do
        get '/users' => 'users#index'
      end

      resources :shippers
      resources :rates
      resources :areas
      resources :weights
      resources :services
      get 'service-rates', to: 'service_rates#index'
    end
  end

  root 'home#index'
  get '/signup', to: 'users#new'
  get '/login', to: 'sessions#new'
  namespace :management do
    namespace :admin do
      resources :shippers, only: :index
      resources :rates, only: :index
    end
  end
end
