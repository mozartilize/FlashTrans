class Api::V1::ShippersController < ApiController
  before_action :authenticate_api_user!

  def index
    render json: {
      status: 'success',
      data: User.shippers
    }, status: 200
  end
end
