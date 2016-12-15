class CreatePrecomputeds < ActiveRecord::Migration[5.0]
  def change
    create_table :precomputeds, id: false do |t|
      t.bigserial              :id, primary_key: true
      
      t.integer                :query_id, limit: 8, null: false
      t.integer                :retrieve_id, limit: 8, null: false
      t.float                  :relevance, null: false
      t.timestamps
    end

    add_foreign_key :precomputeds, :images, column: :query_id, primary_key: :id
    add_foreign_key :precomputeds, :images, column: :retrieve_id, primary_key: :id
  end
end
