class RemoveStatusColumnFromShipments < ActiveRecord::Migration[5.0]
  def change
    remove_column :shipments, :status
  end
end
