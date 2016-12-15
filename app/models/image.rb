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
end
