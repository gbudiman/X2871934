class CreateTags < ActiveRecord::Migration[5.0]
  def change
    create_table :tags, id: false do |t|
      t.integer                :id, limit: 8, primary_key: true
      t.belongs_to             :image, index: true, foreign_key: true, type: :bigint

      t.string                 :category, null: false
      t.string                 :value, null: false
      t.timestamps
    end
  end
end
