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

      resources :shippers do
        collection do
          get 'count'
        end
      end
      resources :rates
      resources :areas
      resources :weights
      resources :services
      resources :cities
      resources :orders do
        collection do
          get 'per-day-stat', to: 'orders#per_day_stat'
          get 'five-days-stat', to: 'orders#five_days_stat'
        end
      end


      resources :order_statuses, path: '/order-statuses'
      get 'service-rates', to: 'service_rates#index'
    end
  end

  root 'home#index'
  get '/signup', to: 'users#new'
  get '/login', to: 'sessions#new'
  get '/confirm-success', to: 'users#confirm_success'

  resources :rates, only: :index
  resources :services, only: :index

  namespace :management do
    namespace :admin do
      resources :shippers, only: :index
      resources :rates, only: :index
      resources :shipments, only: :index
    end

    namespace :shipper do
      resources :shipments, only: :index
    end

    namespace :user do
      resources :orders, only: :index
    end
  end
end
