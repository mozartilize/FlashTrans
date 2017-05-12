class CreateAddresses < ActiveRecord::Migration[5.0]
  def change
    create_table :addresses do |t|
      t.integer :street_no, null: false
      t.string :street_name, null: false
      t.integer :city_id, null: false

      t.timestamps
    end
    add_foreign_key :addresses, :cities, on_delete: :restrict
    add_index :addresses, [:street_no, :street_name, :city_id], unique: true
  end

end
