class CreateWeightForm < Reform::Form
  feature Disposable::Twin::Parent

  property :service_id
  property :weight
  property :bonus

  validation do
    configure do
      option :form

      predicates(IsRecord)

      def uniq_weight?
        !form.model.id &&
        Weight.where(service_id: form.service_id,
                     weight: form.weight,
                     bonus: form.bonus).empty?
      end

      def self.messages
        super.merge(
          en: { errors: { is_record?: 'id is not valid',
                          uniq_weight?: 'exists' } }
        )
      end
    end

    required(:service_id).filled(is_record?: Service)
    required(:weight) { filled? > float? > uniq_weight? }
    required(:bonus).filled(:bool?)
  end

  collection :rates, populate_if_empty: Rate do
    property :price
    property :destination_area_id

    validation do
      configure do
        option :form

        predicates(IsRecord)

        def price_in_range?(value)
          weights = Weight.of_service(service_id: form.parent.service_id)
                          .exclude_bonus
                          .bonus_weight_ordered
          rates = Rate.of_service(service_id: form.parent.service_id)
                      .of_area(area_id: form.destination_area_id)
                      .exclude_bonus
                      .bonus_price_ordered
          # create
          if form.parent.model.id.nil?
            weight_index = (weights.reject { |weight| weight.weight > form.parent.weight }).length - 1
            above_rate = weight_index == 0 ? nil : rates[weight_index]
            under_rate = weight_index == weights.length - 1 ? nil : rates[weight_index + 1]
          # edit
          else
            weight_index = weights.pluck(:id).index(form.parent.model.id)
            above_rate = weight_index == 0 ? nil : rates[weight_index - 1]
            under_rate = weight_index == weights.length - 1 ? nil : rates[weight_index + 1]
          end

          gt_above = above_rate ? form.price >= above_rate.price : true
          lt_under = under_rate ? form.price <= under_rate.price : true
          gt_above && lt_under
        end

        def self.messages
          super.merge(
            en: { errors: { is_record?: 'id is not valid',
                            price_in_range?: 'must be in range of above and under prices' } }
          )
        end
      end

      required(:price) {filled? > float? > price_in_range?}
      required(:destination_area_id).filled(is_record?: Area)
    end
  end
end
