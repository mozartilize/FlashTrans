class Rate < ApplicationRecord
  belongs_to :weight
  belongs_to :destination_area, foreign_key: :destination_area_id, class_name: 'Area'

  scope :of_service, ->(service_id:) {
    joins(:weight).where(weights: {service_id: service_id})
  }

  scope :of_area, ->(area_id:) {
    where(destination_area_id: area_id)
  }

  scope :exclude_bonus, -> { joins(:weight).where(weights: {bonus: false}) }

  scope :bonus_price_ordered, -> { joins(:weight).order(['weights.bonus', :price]) }
end
