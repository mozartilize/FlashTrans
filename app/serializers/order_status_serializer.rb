class OrderStatusSerializer < ActiveModel::Serializer
  attributes :id, :status

  def status
    object.status.capitalize
  end
end
