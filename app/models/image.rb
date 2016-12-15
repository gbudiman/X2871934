class Image < ApplicationRecord
  enum category: [ :query, :retrieve ]

  validates :link, :name, :category, presence: true, strict: ActiveRecord::StatementInvalid
  validate :has_valid_category

  has_many :tags, dependent: :destroy
  has_many :precomputeds
  before_destroy :remove_dependent_precomputeds

  def has_valid_category
    if Image.categories[category] == nil
      raise ActiveRecord::StatementInvalid
    end
  end

  def remove_dependent_precomputeds
    Precomputed.where(query_id: id).destroy_all
    Precomputed.where(retrieve_id: id).destroy_all
  end

  def self.slurp path:, category: Image.categories[:retrieve]
    clothing_categories = {
      4 => 'top_category',
      5 => 'bottom_category',
      6 => 'onepiece_category'
    }

    File.read(path).split(/(\r|\r\n|\n)/).each do |line|
      splits = line.split(/\s+/)
      next unless splits[0] =~ /\A\d+/

      image = Image.create id: splits[0],       
                           link: splits[1],     
                           name: splits[1],    
                           category: category

      if category == Image.categories[:query]
        Tag.create image_id: image.id,
                   category: 'gender',
                   value: case splits[2]
                          when 'F' then 'female'
                          when 'M' then 'male'
                          when 'U' then 'unisex'
                          end

        Tag.create image_id: image.id,
                   category: 'style',
                   value: splits[3].downcase

        (4...6).each do |i|
          if splits[i] != 'none' 
            Tag.create image_id: image.id,
                       category: clothing_categories[i],
                       value: splits[i].downcase
          end
        end
      end
    end
  end
end
