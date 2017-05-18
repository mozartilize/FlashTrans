class OrderStatus < ApplicationRecord
  has_many :orders, foreign_key: :status_id
end
