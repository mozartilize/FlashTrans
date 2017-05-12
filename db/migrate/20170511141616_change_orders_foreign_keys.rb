class ChangeOrdersForeignKeys < ActiveRecord::Migration[5.0]
  def change
    remove_foreign_key :orders, column: :source_address_id
    remove_foreign_key :orders, column: :destination_address_id
    add_foreign_key :orders, :addresses, column: :source_address_id, on_delete: :restrict
    add_foreign_key :orders, :addresses, column: :destination_address_id, on_delete: :restrict
  end
end
