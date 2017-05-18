class Shipment < ApplicationRecord
  belongs_to :order
  belongs_to :shipper, class_name: 'User', foreign_key: :shipper_id
end
