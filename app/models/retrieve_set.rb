class RetrieveSet < ApplicationRecord
  def self.mock_list
    random = rand(100) + 32
    result = Hash.new

    random.times do |i|
      result[i] = Hash.new
    end

    return result
  end
end
