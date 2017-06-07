class Api::V1::ServicesController < ApiController
  skip_before_action :authenticate_api_user!, only: :index

  def index
    services = params[:notable] ? Service.notable : Service.all
    render json: services
  end

  def create
    service = Service.create(name: params[:name],
                             description: params[:description],
                             code: params[:code])
    render json: service, status: 201
  end

  def update
    service = Service.find(params[:id])
    service.update(name: params[:name], description: params[:description])
    render json: service
  end
end
