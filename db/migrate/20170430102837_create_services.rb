class CreateServices < ActiveRecord::Migration[5.0]
  def change
    create_table :services do |t|
      t.string :code, null: false, limit: 3
      t.string :name, limit: 100

      t.timestamps
    end
  end
end
