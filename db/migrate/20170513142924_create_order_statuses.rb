class CreateOrderStatuses < ActiveRecord::Migration[5.0]
  def change
    create_table :order_statuses do |t|
      t.string :status, null: false

      t.timestamps
    end

    add_index :order_statuses, :status, unique: true
  end
end
