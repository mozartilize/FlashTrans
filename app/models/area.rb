class Area < ApplicationRecord
  extend Codable

  has_many :rates, foreign_key: :destination_area_id
end
