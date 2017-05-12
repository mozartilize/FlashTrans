class Order < ApplicationRecord

  belongs_to :user
  has_one :shipment
  belongs_to :source_address, class_name: 'Address', foreign_key: :source_address_id
  belongs_to :destination_address, class_name: 'Address', foreign_key: :destination_address_id

  scope :by_user_id, ->(user_id) { where(user_id: user_id) }
end
