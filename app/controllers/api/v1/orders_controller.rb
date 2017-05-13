class Api::V1::OrdersController < ApiController

  def index
    if current_api_user.role_name == 'admin'
      render json: Order.all.includes(:source_address => :city,
                                      :destination_address => :city),
             include: ['source_address.city', 'destination_address.city']
    elsif current_api_user.role_name == 'user'
      render json: Order.by_user_id(current_api_user.id)
                        .includes(:source_address => :city,
                                  :destination_address => :city),
             include: ['source_address.city', 'destination_address.city']
    else
      render nothing: true, status: 400
    end
  end

  def create
    form = OrderForm.new(Order.new)
    form.prepopulate!(user_id: current_api_user.id)
    if form.validate(params[:order])
      form.save
      render json: form.model
    else
      render json: form.errors, status: 400
    end
  end
end
