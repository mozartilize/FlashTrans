class ChangeOrdersCode < ActiveRecord::Migration[5.0]
  def change
    change_column :orders, :code, :string, null: false
    add_index :orders, :code, unique: true
  end
end
