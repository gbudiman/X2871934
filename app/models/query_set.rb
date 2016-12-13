class QuerySet < ApplicationRecord
  def self.mock_list
    random = rand(40) + 12
    result = Hash.new

    random.times do |i|
      result[i] = Hash.new
    end

    return result
  end
end
