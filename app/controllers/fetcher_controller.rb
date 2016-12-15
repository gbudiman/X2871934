class FetcherController < ApplicationController
  def categories
    #render json: Category.mock_list_all.to_json
    render json: Tag.summarize.to_json
  end

  def queryset
    render json: QuerySet.mock_list.to_json
  end

  def retrieveset
    previous_result = params.has_key?(:previous_result) ? params[:previous_result].to_i : 0
    previous_position = params.has_key?(:previous_position) ? params[:previous_position].to_i : 0
    render json: RetrieveSet.mock_list(previous_result: previous_result,
                                       previous_position: previous_position).to_json
  end
end
