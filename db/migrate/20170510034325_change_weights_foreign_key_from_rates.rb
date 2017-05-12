class ChangeWeightsForeignKeyFromRates < ActiveRecord::Migration[5.0]
  def change
    remove_foreign_key :rates, :weights
    add_foreign_key :rates, :weights, on_delete: :cascade
  end
end
