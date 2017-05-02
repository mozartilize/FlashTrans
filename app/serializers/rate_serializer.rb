class RateSerializer < ActiveModel::Serializer
  attributes :price, :destination_area, :weight

  def weight
    WeightSerializer.new(object.weight).attributes
  end

  def destination_area
    AreaSerializer.new(object.destination_area).attributes
  end
end
