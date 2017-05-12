class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.integer :user_id, null: false
      t.integer :order_address_id, null: false
      t.integer :service_id, null: false

      t.timestamps
    end

    add_foreign_key :orders, :users, on_delete: :cascade
    add_foreign_key :orders, :order_addresses, on_delete: :restrict
    add_foreign_key :orders, :services, on_delete: :restrict
  end
end
