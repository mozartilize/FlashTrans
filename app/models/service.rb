class Service < ApplicationRecord
  extend Codable
  has_many :weights
  has_many :orders

  def self.notable
    left_outer_joins(:orders)
      .group('services.id')
      .select('services.*, count(services.id) AS number_of_order')
      .order('number_of_order DESC')
      .limit(3)
  end
end
