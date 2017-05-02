class AddIndexToRates < ActiveRecord::Migration[5.0]
  def change
    add_index :rates, [:weight_id, :destination_area_id], unique: true
  end
end
