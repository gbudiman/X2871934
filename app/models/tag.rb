class Tag < ApplicationRecord
  belongs_to :image
  validates :image, presence: true, strict: ActiveRecord::StatementInvalid

  def self.summarize
    summary = Hash.new
    Tag.all.each do |r|
      summary[r.category.to_sym] ||= Hash.new
      summary[r.category.to_sym][r.value.to_sym] ||= 0
      summary[r.category.to_sym][r.value.to_sym] += 1
    end

    return summary
  end
end
