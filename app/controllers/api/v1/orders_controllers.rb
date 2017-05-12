class Api::V1::OrdersController < ApiController

  def index
    if current_api_user.role_name == 'admin'
      render json: Order.all
    elsif current_api_user.role_name == 'user'
      render json: Order.by_user_id(current_api_user.id)
    else
      render nothing: true, status: 400
    end
  end

end
