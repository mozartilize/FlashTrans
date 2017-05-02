class Api::V1::RatesController < ApiController
  skip_before_action :authenticate_api_user!, only: :index

  def index
    render json: Rate.all
  end
end
