class Weight < ApplicationRecord
  belongs_to :service
  has_many :rates

  scope :of_service, ->(service_id:) { where(service_id: service_id) }

  scope :exclude_bonus, -> { where(bonus: false) }

  scope :bonus_weight_ordered, -> { order([:bonus, :weight]) }
end
