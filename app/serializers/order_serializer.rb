class OrderSerializer < ActiveModel::Serializer
  attributes :id, :service_id, :created_at
  belongs_to :source_address
  belongs_to :destination_address
end
