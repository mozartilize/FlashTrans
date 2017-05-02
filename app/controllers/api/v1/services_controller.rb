class Api::V1::ServicesController < ApiController
  skip_before_action :authenticate_api_user!, only: :index

  def index
    services = Service.all
    render_serialized(services, ServiceRateSerializer)
  end
end
