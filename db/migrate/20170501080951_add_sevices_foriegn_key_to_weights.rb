class AddSevicesForiegnKeyToWeights < ActiveRecord::Migration[5.0]
  def change
    add_foreign_key :weights, :services, on_delete: :restrict
  end
end
