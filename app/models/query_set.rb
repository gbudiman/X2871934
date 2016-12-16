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
      q = Hash.new
      queries.each do |query|
        q[query[0]] ||= Array.new
        q[query[0]].push query[1]
      end

      # ap q
      # queries.each do |query|
      #   if t == nil
      #     t = Tag.where(category: query[0], value: query[1])
      #   else
      #     t = t.where(category: query[0], value: query[1])
      #   end
      # end


      ids = Array.new
      q.each_with_index do |(category, values), order|
        fetches = Tag.where(category: category, value: values).pluck(:image_id)

        # ap fetches
        # ap ' -> '
        if order == 0
          ids = ids | fetches
        else
          ids = ids & fetches
        end
        # ap ids
      end

      #ids = t.pluck(:image_id).uniq

      images = Image.where(id: ids).select(:id, :link, :name)
    end

    return {
      base_path: Rails.configuration.s3_base_path,
      images: images
    }
  end
end
