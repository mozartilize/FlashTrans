class ChangeSerivesCodeColumn < ActiveRecord::Migration[5.0]
  def change
    change_column(:services, :code, :string, unique: true)
  end
end
