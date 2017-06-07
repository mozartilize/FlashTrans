class Api::V1::OrdersController < ApiController
  skip_before_action :authenticate_api_user!, only: [:show, :per_day_stat]

  def index
    if current_api_user.role_name == 'admin'
      if params[:status]
        orders_render(Order.by_status(params[:status]).latest_ordered)
      else
        orders_render(Order.all.latest_ordered)
      end
    elsif current_api_user.role_name == 'user'
      orders_render(Order.by_user_id(current_api_user.id).latest_ordered)
    elsif current_api_user.role_name == 'shipper'
      order_render(Order.by_shipper_id(current_api_user.id).latest_ordered)
    else
      render status: 400
    end
  end

  def create
    form = OrderForm.new(Order.new)
    form.prepopulate!(user_id: current_api_user.id,
                      code: ModelSecureToken.generate(half_len: 3,
                                                      model: Order,
                                                      attribute: 'code'),
                      status_id: OrderStatus.find_by(status: 'unprocessed').id)
    if form.validate(params[:order])
      form.save
      order_render(form.model)
    else
      render json: form.errors, status: 400
    end
  end

  def update
    form = OrderForm.new(Order.find(params[:id]))
    if form.validate(params[:order])
      form.save
      order_render(form.model)
    else
      render json: form.errors, status: 400
    end
  rescue ActiveRecord::RecordNotFound
    render status: 400
  end

  def show
    code = params[:id]
    order = Order.by_code(code)
    if order
      order_render(order)
    else
      render nothing: true, status: 400
    end
  end

  def destroy
    order = Order.find(params[:id])
    order.destroy
    render nothing: true, status: 200
  rescue ActiveRecord::RecordNotFound
    render json: {errors: 'Not found'}, status: 404
  end

  def per_day_stat
    render json: {
      order_per_day: Order.order_per_day,
      delivered_per_day: Order.delivered_per_day
    }
  end

  def five_days_stat
    render json: Order.five_days_stat
  end

  private

  def orders_render(orders)
    render json: orders.includes({source_address: :city,
                                  destination_address: :city,
                                  shipment: :shipper},
                                 :service, :user, :status),
           include: ['source_address.city', 'destination_address.city',
                     'shipment.shipper', 'service', 'user']
  end

  def order_render(order)
    render json: order,
           include: ['source_address.city', 'destination_address.city',
                     'shipment.shipper', 'service', 'user']
  end
end
