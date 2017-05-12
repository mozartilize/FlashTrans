class ChangeOrders < ActiveRecord::Migration[5.0]
  def change
    remove_foreign_key :orders, :order_addresses
    remove_column :orders, :order_address_id
    add_column :orders, :source_address_id, :integer, null: false
    add_column :orders, :destination_address_id, :integer, null: false
    add_foreign_key :orders, :addresses, column: :source_address_id
    add_foreign_key :orders, :addresses, column: :destination_address_id
  end
end
