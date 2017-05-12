class ChangeWeights < ActiveRecord::Migration[5.0]
  def change
    remove_column :weights, :degree
  end
end
