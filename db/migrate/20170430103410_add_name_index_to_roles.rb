class AddNameIndexToRoles < ActiveRecord::Migration[5.0]
  def change
    add_index :roles, :name, unique: true
  end
end
