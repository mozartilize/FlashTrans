class Address < ApplicationRecord
  belongs_to :city
  has_many :source_address_orders, class_name: 'Order', foreign_key: :source_address_id
  has_many :destination_address_orders, class_name: 'Order', foreign_key: :destination_address_id
end
