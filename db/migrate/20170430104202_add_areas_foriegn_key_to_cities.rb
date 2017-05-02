class AddAreasForiegnKeyToCities < ActiveRecord::Migration[5.0]
  def change
    add_foreign_key :cities, :areas, on_delete: :restrict
  end
end
