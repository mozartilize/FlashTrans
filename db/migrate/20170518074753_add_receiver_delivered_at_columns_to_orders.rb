class AddReceiverDeliveredAtColumnsToOrders < ActiveRecord::Migration[5.0]
  def change
    add_column :orders, :receiver, :string, limit: 100
    add_column :orders, :receiver_phone, :string
    add_column :orders, :delivered_at, :datetime
  end
end
