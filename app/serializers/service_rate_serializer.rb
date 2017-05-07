class ServiceRateSerializer < ActiveModel::Serializer
  attributes :code, :name
  has_many :weights
end
