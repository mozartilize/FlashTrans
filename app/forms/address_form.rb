class AddressForm < Reform::Form
  properties :street_no, :street_name, :city_id

  validation do
    configure do
      predicates(IsRecord)

      def self.messages
        super.merge(
          en: {errors: {is_record?: 'id is not valid'}}
        )
      end
    end
    required(:city_id).filled(is_record?: City)
    required(:street_no).filled(:int?).value(gteq?: 1)
  end
end
