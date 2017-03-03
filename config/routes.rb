Rails.application.routes.draw do
  delete '/count_numbers/destroy_all' => "count_numbers#destroy_all"
  resources :count_numbers, only: [:index, :create, :show, :destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
