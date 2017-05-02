class Weight < ApplicationRecord
  belongs_to :service
  has_many :rates
end
