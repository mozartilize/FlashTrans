class AddDeliveredAtToShipment < ActiveRecord::Migration[5.0]
  def change
    add_column :shipments, :delivered_at, :datetime
  end
end
