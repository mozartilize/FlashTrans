class Api::V1::WeightsController < ApiController
  skip_before_action :authenticate_api_user!, only: :index

  def index
    render json: Weight.all
  end
end
