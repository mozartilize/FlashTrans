class CreateOrderAddresses < ActiveRecord::Migration[5.0]
  def change
    create_table :order_addresses do |t|
      t.integer :source_address_id, null: false
      t.integer :destination_address_id, null: false

      t.timestamps
    end

    add_foreign_key :order_addresses, :addresses, column: :source_address_id, on_delete: :restrict
    add_foreign_key :order_addresses, :addresses, column: :destination_address_id, on_delete: :restrict
    add_index :order_addresses, [:source_address_id, :destination_address_id], unique: true, name: 'index_addresses'
  end
end
