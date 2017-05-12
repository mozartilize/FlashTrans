module IsRecord
  include Dry::Logic::Predicates

  predicate(:is_record?) do |cls, value|
    cls.where(id: value).any?
  end
end
