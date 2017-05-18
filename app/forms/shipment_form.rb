class ShipmentForm < Reform::Form
  properties :order_id,
             :shipper_id,
             :weight,
             :rate_weight,
             :rate_price,
             :bonus_weight,
             :bonus_price,
             :cost

  validation do
    configure do
      predicates(IsRecord)

      def self.messages
        super.merge(
          en: {errors: {is_record?: 'id is not valid'}}
        )
      end
    end

    required(:order_id).filled(is_record?: Order)
    required(:shipper_id).filled(is_record?: User)
  end
end
