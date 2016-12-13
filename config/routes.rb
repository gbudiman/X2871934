Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root                           to: 'demo#index'
  get         '/demo'          , to: 'demo#index'
  get         '/fetch/categories', to: 'fetcher#categories'
  get         '/fetch/queryset', to: 'fetcher#queryset'
end
