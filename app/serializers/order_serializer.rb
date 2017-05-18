class OrderSerializer < ActiveModel::Serializer
  attributes :id, :code, :created_at, :status
  belongs_to :service
  belongs_to :user
  belongs_to :source_address
  belongs_to :destination_address
  has_one :shipment

  def status
    OrderStatusSerializer.new(object.status).attributes
  end

  def created_at
    object.created_at.strftime('%m/%d/%Y %H:%M')
  end
end
