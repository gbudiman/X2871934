# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161215035718) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "images", id: :bigserial, force: :cascade do |t|
    t.string   "link",         null: false
    t.string   "name",         null: false
    t.float    "cnn_features",              array: true
    t.integer  "category",     null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["link"], name: "unique_link", unique: true, using: :btree
  end

  create_table "precomputeds", id: :bigserial, force: :cascade do |t|
    t.bigint   "query_id",    null: false
    t.bigint   "retrieve_id", null: false
    t.float    "relevance",   null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "tags", id: :bigserial, force: :cascade do |t|
    t.bigint   "image_id"
    t.string   "category",   null: false
    t.string   "value",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["image_id", "category", "value"], name: "unique_image_category_value", unique: true, using: :btree
    t.index ["image_id"], name: "index_tags_on_image_id", using: :btree
  end

  add_foreign_key "precomputeds", "images", column: "query_id"
  add_foreign_key "precomputeds", "images", column: "retrieve_id"
  add_foreign_key "tags", "images"
end
