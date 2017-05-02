class CreateRates < ActiveRecord::Migration[5.0]
  def change
    create_table :rates do |t|
      t.integer :service_id, null: false
      t.integer :destination_area_id, null: false
      t.float :weight, null: false
      t.float :price, null: false
      t.boolean :bonus, null: false

      t.timestamps
    end
  end
end
