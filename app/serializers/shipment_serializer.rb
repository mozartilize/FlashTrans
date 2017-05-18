class ShipmentSerializer < ActiveModel::Serializer
  attributes :weight, :rate_weight, :rate_price, :bonus_weight, :bonus_price, :cost
  belongs_to :shipper
end
