class WeightSerializer < ActiveModel::Serializer
  attributes :id, :weight, :degree, :bonus
  has_many :rates
end
