class AddCodeColumnToOrders < ActiveRecord::Migration[5.0]
  def change
    add_column :orders, :code, :string
  end
end
