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

  def self.generate_from query:, previous_position:, segment:
    cache = Rails.configuration.cache
    cached = cache.fetch query
    rsegment = segment == 0 ? SEGMENT : segment
    serializable_cache = nil

    if cached
      ap 'From cache'
      serializable_cache = {
        base_path: Rails.configuration.s3_base_path,
        images: cached[previous_position, previous_position + rsegment],
        segment: rsegment,
        position: previous_position + segment,
        result_count: cached.length
      }
    else
      ap 'fresh'
      precomputeds = Precomputed.where(query_id: query)

      images = Hash.new
      precs = Array.new

      Image.where(id: precomputeds.pluck(:retrieve_id)).select(:id, :link, :name).each do |img|
        images[img[:id]] = {
          link: img[:link],
          name: img[:name]
        }
      end

      precomputeds.select(:retrieve_id, :relevance).each do |ps|
        precs.push({
          id: ps[:retrieve_id],
          relevance: ps[:relevance]
        }.merge(images[ps[:retrieve_id]]))
      end

      precs_length = precs.length

      # Enable this block to simulate large data volume
      # 20.times do 
      #   (0..precs_length).each do |i|
      #     precs.push precs[i]
      #   end
      # end

      serializable_cache = {
        base_path: Rails.configuration.s3_base_path,
        images: precs[previous_position, previous_position + rsegment],
        segment: rsegment,
        position: previous_position + segment,
        result_count: precs.length
      }

      cache.write(query, precs, expires_in: 1.hour);
    end

    return serializable_cache
  end
end
