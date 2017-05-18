class Api::V1::OrderStatusesController < ApiController
  def index
    if current_api_user.role_name == 'admin'
      render json: OrderStatus.all
    else
      render status: 404
    end
  end
end
