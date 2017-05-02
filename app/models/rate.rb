class Rate < ApplicationRecord
  belongs_to :weight
  belongs_to :destination_area, foreign_key: :destination_area_id, class_name: 'Area'
end
