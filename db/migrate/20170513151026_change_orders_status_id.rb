class ChangeOrdersStatusId < ActiveRecord::Migration[5.0]
  def change
    change_column :orders, :status_id, :integer, null: false
  end
end
