class DropOrderAddresses < ActiveRecord::Migration[5.0]
  def change
    drop_table :order_addresses
  end
end
