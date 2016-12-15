class TagController < ApplicationController
  def summary
    render json: Tag.summarize.to_json
  end
end
