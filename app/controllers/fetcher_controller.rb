class FetcherController < ApplicationController
  def categories
    render json: Category.mock_list_all.to_json
  end
end
