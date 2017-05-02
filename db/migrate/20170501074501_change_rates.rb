class ChangeRates < ActiveRecord::Migration[5.0]
  def change
    remove_foreign_key :rates, :services
    remove_column :rates, :service_id
    remove_column :rates, :bonus
    rename_column :rates, :weight, :weight_id
    change_column :rates, :weight_id, :integer
    add_foreign_key :rates, :weights
  end
end
