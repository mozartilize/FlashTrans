class Api::V1::OrdersController < ApiController

  def index
    if current_api_user.role_name == 'admin'
      orders_render(Order.all.latest_ordered)
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
                                                      attribute: 'code'))
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
