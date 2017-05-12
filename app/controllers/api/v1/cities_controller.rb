class Api::V1::CitiesController < ApiController
  def index
    render json: City.all
  end
end
