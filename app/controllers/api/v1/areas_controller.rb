class Api::V1::AreasController < ApiController
  skip_before_action :authenticate_api_user!, only: :index

  def index
    render json: Area.all
  end
end
