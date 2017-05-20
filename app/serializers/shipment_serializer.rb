class ShipmentSerializer < ActiveModel::Serializer
  attributes :weight,
             :rate_weight,
             :rate_price,
             :bonus_weight,
             :bonus_price,
             :cost,
             :delivered_at
  belongs_to :shipper

  def delivered_at
    return object.delivered_at unless object.delivered_at
    object.delivered_at.strftime('%Y-%m-%d %H:%M')
  end
end
