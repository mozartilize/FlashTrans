class ChangeAreasForeignKeyInRates < ActiveRecord::Migration[5.0]
  def change
    remove_foreign_key :rates, :areas
    add_foreign_key :rates, :areas, column: :destination_area_id,
                                    on_delete: :cascade
  end
end
