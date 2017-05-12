class Api::V1::WeightsController < ApiController
  skip_before_action :authenticate_api_user!, only: [:index, :create, :update, :destroy]

  def index
    render json: Weight.all.bonus_weight_ordered
  end

  def create
    form = CreateWeightForm.new(Weight.new)
    if form.validate(params[:add])
      form.save
      render json: form.model, include: ['rates'], status: 201
    else
      render json: form.errors, status: 400
    end
  end

  def update
    weight_model = Weight.find(params[:id])
    weight_model.assign_attributes(params[:weight].as_json)
    form = CreateWeightForm.new(weight_model)
    params[:rates].as_json.each do |edited_rate|
      rate = form.rates.detect { |form_rate| form_rate.model.id == edited_rate['id'] }
      rate.(edited_rate)
    end
    if form.valid?
      form.save
      render json: {status: 'success'}, status: 204
    else
      render json: form.errors, status: 400
    end
  end

  def destroy
    weight = Weight.find(params[:id])
    weight.destroy
    render json: {status: 'success'}, status: 200
  rescue ActiveRecord::RecordNotFound
    render json: {status: 'error', error: 'Record not found'}, status: 400
  end
end
