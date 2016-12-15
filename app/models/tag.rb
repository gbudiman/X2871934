class Tag < ApplicationRecord
  belongs_to :image
  validates :image, presence: true, strict: ActiveRecord::StatementInvalid
end
