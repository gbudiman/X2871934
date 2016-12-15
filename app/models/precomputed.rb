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

  def self.slurp path:
    File.read(path).split(/(\r|\r\n|\n)/).each do |line|
      splits = line.split(/\s+/)
      next unless splits[0] =~ /\A\d+/

      3.times do |j|
        Precomputed.create query_id: splits[0].to_i,
                           retrieve_id: splits[j * 2 + 1].to_i,
                           relevance: splits[j * 2 + 2].to_i
      end
    end
  end
end
