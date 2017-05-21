class WeightRateSerializer < ActiveModel::Serializer
  attributes :id, :weight, :bonus
  has_many :rates
end
