class ChangeRolesNameColumn < ActiveRecord::Migration[5.0]
  def change
    change_column(:roles, :name, :string, unique: true)
  end
end
