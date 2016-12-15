class Image < ApplicationRecord
  enum category: [ :query, :retrieve ]

  validates :link, :name, :category, presence: true, strict: ActiveRecord::StatementInvalid
  validate :has_valid_category

  has_many :tags, dependent: :destroy

  def has_valid_category
    if Image.categories[category] == nil
      raise ActiveRecord::StatementInvalid
    end
  end
end
