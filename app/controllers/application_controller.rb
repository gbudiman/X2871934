class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  APP_BASE_TITLE = 'X2871934'

  def self.title _subpages: Array.new
    subpages = _subpages
    if !_subpages.is_a?(Array)
      subpages = [_subpages]
    end

    subpages.unshift(APP_BASE_TITLE)
    return subpages.join(' :: ')
  end

  def fetch_category
    render json: Category.mock_list_all.to_json
  end
end
