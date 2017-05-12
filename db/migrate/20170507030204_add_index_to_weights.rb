class AddIndexToWeights < ActiveRecord::Migration[5.0]
  def change
    add_index :weights, [:service_id, :weight, :bonus], unique: true
  end

end
