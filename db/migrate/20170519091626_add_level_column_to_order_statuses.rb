class AddLevelColumnToOrderStatuses < ActiveRecord::Migration[5.0]
  def change
    add_column :order_statuses, :process_level, :integer
    add_column :order_statuses, :role_id, :integer
    add_index :order_statuses, :process_level, unique: true
    add_foreign_key :order_statuses, :roles
  end
end
