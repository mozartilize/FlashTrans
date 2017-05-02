class CreateWeights < ActiveRecord::Migration[5.0]
  def change
    create_table :weights do |t|
      t.integer :service_id, null: false
      t.integer :degree, null: false
      t.float :weight, null: false
      t.boolean :bonus, null: false

      t.timestamps
    end

    add_index :weights, [:service_id, :degree], unique: true
  end
end
