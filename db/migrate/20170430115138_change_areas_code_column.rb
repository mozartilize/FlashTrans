class ChangeAreasCodeColumn < ActiveRecord::Migration[5.0]
  def change
    change_column(:areas, :code, :string, unique: true)
  end
end
