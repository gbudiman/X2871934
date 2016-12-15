class Image < ApplicationRecord
  enum category: [ :query, :retrieve ]

  validates :link, :name, :category, presence: true, strict: ActiveRecord::StatementInvalid
  validate :has_valid_category

  def has_valid_category
    if Image.categories[category] == nil
      raise ActiveRecord::StatementInvalid
    end
  end
end
