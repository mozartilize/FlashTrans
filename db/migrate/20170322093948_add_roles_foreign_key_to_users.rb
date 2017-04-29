class AddRolesForeignKeyToUsers < ActiveRecord::Migration[5.0]
  def change
    add_foreign_key :users, :roles
  end
end
