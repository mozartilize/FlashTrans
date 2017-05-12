class CreateShipments < ActiveRecord::Migration[5.0]
  def change
    create_table :shipments do |t|
      t.integer :shipper_id
      t.integer :order_id, null: false
      t.float :weight
      t.float :rate_weight
      t.float :rate_price
      t.float :bonus_weight
      t.float :bonus_price
      t.float :cost
      t.integer :status, null: false

      t.timestamps
    end

    add_foreign_key :shipments, :users, column: :shipper_id, on_delete: :nullify
    add_foreign_key :shipments, :orders, on_delete: :restrict
    add_index :shipments, :order_id, unique: true
  end
end
