class Precomputed < ApplicationRecord
  belongs_to :image, foreign_key: 'query_id'
  validates :image, presence: true, strict: ActiveRecord::StatementInvalid

  belongs_to :image, foreign_key: 'retrieve_id'
  validates :image, presence: true, strict: ActiveRecord::StatementInvalid

  validate :has_non_circular_query_retrieve_reference

  validates :relevance, numericality: {
    greater_than_or_equal_to: 0,
    less_than_or_equal_to: 1
  }, strict: ActiveRecord::StatementInvalid

  def has_non_circular_query_retrieve_reference
    if query_id == retrieve_id
      raise ActiveRecord::StatementInvalid, 'Circular reference: query_id == retrieve_id'
    end
  end
end
