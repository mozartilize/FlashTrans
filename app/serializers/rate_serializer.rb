class RateSerializer < ActiveModel::Serializer
  attributes :id, :price, :destination_area_id, :weight_id
end
