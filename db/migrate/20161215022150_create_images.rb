class CreateImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images, id: false do |t|
      t.integer                :id, limit: 8, primary_key: true
      t.string                 :link, null: false
      t.string                 :name, null: false
      t.float                  :cnn_features, null: true, array: true
      t.integer                :category, null: false

      t.timestamps
    end
  end
end
