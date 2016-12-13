class FetcherController < ApplicationController
  def categories
    render json: Category.mock_list_all.to_json
  end

  def queryset
    render json: QuerySet.mock_list.to_json
  end

  def retrieveset
    render json: RetrieveSet.mock_list.to_json
  end
end
