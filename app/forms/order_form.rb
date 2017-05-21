class OrderForm < Reform::Form

  property :service_id
  property :code, prepopulator: ->(options) { self.code = options[:code] }
  property :shipment, populator: :shipment_populator!, form: ShipmentForm
  property :user_id, prepopulator: ->(options) { self.user_id = options[:user_id] }
  property :source_address, populator: :address_populator!, form: AddressForm
  property :destination_address, populator: :address_populator!, form: AddressForm
  property :status_id, prepopulator: ->(options) { self.status_id = options[:status_id] }

  validation do
    configure do
      option :form

      predicates(IsRecord)

      def different_addresses?
        form.source_address.street_no != form.destination_address.street_no ||
        form.source_address.street_name != form.destination_address.street_name ||
        form.source_address.city_id != form.destination_address.city_id
      end

      def self.messages
        super.merge(
          en: {errors: {is_record?: 'id is not valid',
                        different_addresses?: 'must be different with destination address'}}
        )
      end
    end
    required(:service_id).filled(is_record?: Service)
    required(:user_id).filled(is_record?: User)
    required(:source_address) { filled? > different_addresses? }
    required(:destination_address).filled
  end

  private

  def address_populator!(options)
    address = Address.find_by(street_no: options[:fragment][:street_no],
                              street_name: options[:fragment][:street_name],
                              city_id: options[:fragment][:city_id]) ||
              Address.new
    send("#{options[:as]}=", address)
  end

  def shipment_populator!(options)
    self.shipment = (model = options[:represented].model) &&
                    (model.shipment || Shipment.new)
    shipment.order_id = model.id
  end
end
