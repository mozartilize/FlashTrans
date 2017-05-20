class Order < ApplicationRecord
  extend Codable

  belongs_to :service
  belongs_to :user
  has_one :shipment
  belongs_to :status, class_name: 'OrderStatus', foreign_key: :status_id
  belongs_to :source_address, class_name: 'Address', foreign_key: :source_address_id
  belongs_to :destination_address, class_name: 'Address', foreign_key: :destination_address_id

  scope :by_user_id, ->(user_id) { where(user_id: user_id) }

  scope :by_shipper_id, ->(shipper_id) {
    joins(:shipment).where(shipments: { shipper_id: shipper_id })
  }

  scope :latest_ordered, -> { order(created_at: :desc) }
end
