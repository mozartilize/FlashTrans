class AddAreasForiegnKeyToRates < ActiveRecord::Migration[5.0]
  def change
    add_foreign_key :rates, :areas, column: :destination_area_id,
                                    on_delete: :restrict
  end
end
