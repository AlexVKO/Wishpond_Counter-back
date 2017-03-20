Rails.application.routes.draw do
  # CLIENT
  root "pages#index"

  # API
  delete "/count_numbers/destroy_all" => "count_numbers#destroy_all"
  resources :count_numbers, only: [:index, :create, :show, :destroy]
end
