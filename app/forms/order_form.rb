class OrderForm < Reform::Form

  properties :service_id, :user_id
  property :source_address, populator: :address_populator, form: AddressForm
  property :destination_address, populator: :address_populator, form: AddressForm

  validation do
    configure do
      predicates(IsRecord)

      def self.messages
        super.merge(
          en: {errors: {is_record?: 'id is not valid'}}
        )
      end
    end
    required(:service_id).filled(is_record?: Service)
    required(:user_id).filled(is_record?: User)
  end

  private

  def address_populator(options)
    address = Address.find_by(street_no: options[:fragment][:street_no],
                street_name: options[:fragment][:street_name],
                city_id: options[:fragment][:city_id]) ||
              Address.new(street_no: options[:fragment][:street_no],
                street_name: options[:fragment][:street_name],
                city_id: options[:fragment][:city_id])
    self.send("#{options[:as]}=", address)
  end
end
