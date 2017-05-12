class Shipment < ApplicationRecord
  belongs_to :order
  belongs_to :shipper, class: 'User', foreign_key: :shipper_id
end
