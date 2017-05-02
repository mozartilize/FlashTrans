class CreateAreas < ActiveRecord::Migration[5.0]
  def change
    create_table :areas do |t|
      t.string :code, null: false, limit: 1
      t.string :description, limit: 100

      t.timestamps
    end
  end
end
