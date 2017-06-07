class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :code, :name, :description
end
