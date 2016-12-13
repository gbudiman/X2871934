class RetrieveSet < ApplicationRecord
  SEGMENT = 20

  def self.mock_list previous_result:, previous_position:
    random = previous_result == 0 ? rand(100) + 32 : previous_result
    result = Hash.new

    segment_count = previous_position + SEGMENT < random ? SEGMENT : random - previous_position

    segment_count.times do |i|
      result[previous_position + i] = {
        relevance: 99.3 - (previous_position + i) * 0.137
      }
    end

    return {
      data: result,
      position: previous_result == 0 ? 0 : previous_position + SEGMENT,
      result: random,
      segment: SEGMENT
    }
  end
end
