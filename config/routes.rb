Rails.application.routes.draw do
  resources :count_numbers, only: [:index]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
