class AddUniqueConstraintOnImageLink < ActiveRecord::Migration[5.0]
  def change
    add_index :images, :link, unique: true, name: 'unique_link'
  end
end
