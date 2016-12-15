class AddUniqueConstraintOnTagCategoryValue < ActiveRecord::Migration[5.0]
  def change
    add_index :tags, [:image_id, :category, :value], unique: true, name: 'unique_image_category_value'
  end
end
