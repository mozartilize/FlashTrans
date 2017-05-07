class Api::V1::ServiceRatesController < ApiController
  skip_before_action :authenticate_api_user!, only: :index

  def index
    services = Service.all
    render json: services, each_serializer: ServiceRateSerializer, include: ['weights.rates.**']
  end
end
