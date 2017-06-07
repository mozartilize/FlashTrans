class AddColumnsToServices < ActiveRecord::Migration[5.0]
  def change
    add_column :services, :description, :string, limit: 200
    add_column :services, :active, :boolean
  end
end
