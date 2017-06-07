class Api::V1::ShippersController < ApiController
  skip_before_action :authenticate_api_user!, only: [:count]

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

  def destroy
    shipper = User.find(params[:id])
    if shipper.role_name == 'shipper'
      shipper.destroy
      render nothing: true, status: 204
    else
      render json: {errors: 'Invalid'}, status: 400
    end
  rescue ActiveRecord::RecordNotFound
    render nothing: true, status: 404
  end

  def count
    render json: {count: User.shippers.count}
  end
end
