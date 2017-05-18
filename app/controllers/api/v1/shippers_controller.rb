class Api::V1::ShippersController < ApiController

  def index
    if current_api_user.role_name == 'admin'
      render json: {
        status: 'success',
        data: User.shippers
      }, status: 200
    else
      render status: 404
    end
  end
end
