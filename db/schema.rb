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

ActiveRecord::Schema.define(version: 20170511141616) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.integer  "street_no",   null: false
    t.string   "street_name", null: false
    t.integer  "city_id",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["street_no", "street_name", "city_id"], name: "index_addresses_on_street_no_and_street_name_and_city_id", unique: true, using: :btree
  end

  create_table "areas", force: :cascade do |t|
    t.string   "code",                    null: false
    t.string   "description", limit: 100
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "cities", force: :cascade do |t|
    t.string   "name",       limit: 100, null: false
    t.integer  "area_id",                null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "orders", force: :cascade do |t|
    t.integer  "user_id",                null: false
    t.integer  "service_id",             null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "source_address_id",      null: false
    t.integer  "destination_address_id", null: false
  end

  create_table "rates", force: :cascade do |t|
    t.integer  "destination_area_id", null: false
    t.integer  "weight_id",           null: false
    t.float    "price",               null: false
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.index ["weight_id", "destination_area_id"], name: "index_rates_on_weight_id_and_destination_area_id", unique: true, using: :btree
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_roles_on_name", unique: true, using: :btree
  end

  create_table "services", force: :cascade do |t|
    t.string   "code",                   null: false
    t.string   "name",       limit: 100
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "shipments", force: :cascade do |t|
    t.integer  "shipper_id"
    t.integer  "order_id",     null: false
    t.float    "weight"
    t.float    "rate_weight"
    t.float    "rate_price"
    t.float    "bonus_weight"
    t.float    "bonus_price"
    t.float    "cost"
    t.integer  "status",       null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["order_id"], name: "index_shipments_on_order_id", unique: true, using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "email"
    t.string   "first_name"
    t.string   "last_name"
    t.date     "birthday"
    t.string   "address"
    t.string   "phone_number"
    t.integer  "role_id"
    t.json     "tokens"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree
  end

  create_table "weights", force: :cascade do |t|
    t.integer  "service_id", null: false
    t.float    "weight",     null: false
    t.boolean  "bonus",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["service_id", "weight", "bonus"], name: "index_weights_on_service_id_and_weight_and_bonus", unique: true, using: :btree
  end

  add_foreign_key "addresses", "cities", on_delete: :restrict
  add_foreign_key "cities", "areas", on_delete: :restrict
  add_foreign_key "orders", "addresses", column: "destination_address_id", on_delete: :restrict
  add_foreign_key "orders", "addresses", column: "source_address_id", on_delete: :restrict
  add_foreign_key "orders", "services", on_delete: :restrict
  add_foreign_key "orders", "users", on_delete: :cascade
  add_foreign_key "rates", "areas", column: "destination_area_id", on_delete: :cascade
  add_foreign_key "rates", "weights", on_delete: :cascade
  add_foreign_key "shipments", "orders", on_delete: :restrict
  add_foreign_key "shipments", "users", column: "shipper_id", on_delete: :nullify
  add_foreign_key "users", "roles"
  add_foreign_key "weights", "services", on_delete: :restrict
end
