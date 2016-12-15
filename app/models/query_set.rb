class QuerySet < ApplicationRecord
  def self.mock_list
    random = rand(40) + 12
    result = Hash.new

    random.times do |i|
      result[i] = Hash.new
    end

    return result
  end

  def self.generate_from queries:
    images = nil
    ActiveRecord::Base.transaction do
      t = nil

      queries.each do |query|
        if t == nil
          t = Tag.where(category: query[0], value: query[1])
        else
          t = t.or(Tag.where(category: query[0], value: query[1]))
        end
      end

      ids = t.pluck(:image_id).uniq

      images = Image.where(id: ids).select(:id, :link, :name)
    end

    return {
      base_path: Rails.configuration.s3_base_path,
      images: images
    }
  end
end
