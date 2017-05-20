class OrderStatus < ApplicationRecord
  has_many :orders, foreign_key: :status_id

  scope :level_ordered, -> { order(:process_level) }
end
