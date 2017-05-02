ned_service_id = Service.id_by_code('NED')

weights = [
  [ned_service_id, 1, 0.05, false],
  [ned_service_id, 2, 0.10, false],
  [ned_service_id, 3, 0.25, false],
  [ned_service_id, 4, 0.50, false],
  [ned_service_id, 5, 1.00, false],
  [ned_service_id, 6, 1.50, false],
  [ned_service_id, 7, 2.00, false],
  [ned_service_id, 0, 0.50, true]
]

ActiveRecord::Base.transaction do
  weights.each do |weight_data|
    Weight.create(service_id: weight_data[0],
                  degree: weight_data[1],
                  weight: weight_data[2],
                  bonus: weight_data[3])
  end
end
