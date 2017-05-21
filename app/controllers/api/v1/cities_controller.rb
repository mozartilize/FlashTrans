class Api::V1::CitiesController < ApiController
  skip_before_action :authenticate_api_user!, only: :index

  def index
    render json: City.all
  end
end
