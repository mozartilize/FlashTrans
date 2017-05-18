class Service < ApplicationRecord
  extend Codable
  has_many :weights
  has_many :orders
end
