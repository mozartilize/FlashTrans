class AddSevicesForiegnKeyToRates < ActiveRecord::Migration[5.0]
  def change
    add_foreign_key :rates, :services, on_delete: :restrict
  end
end
