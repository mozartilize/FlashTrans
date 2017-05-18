class AddStatusIdToOrders < ActiveRecord::Migration[5.0]
  def change
    add_column :orders, :status_id, :integer
    add_foreign_key :orders, :order_statuses, column: :status_id, on_delete: :restrict
  end
end
