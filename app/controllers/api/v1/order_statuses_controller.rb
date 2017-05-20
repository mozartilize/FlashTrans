class Api::V1::OrderStatusesController < ApiController
  def index
    render json: OrderStatus.all.level_ordered
  end
end
