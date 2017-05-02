class Service < ApplicationRecord
  extend Codable
  has_many :weights
end
