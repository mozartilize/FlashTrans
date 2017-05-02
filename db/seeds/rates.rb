
ned_service_weights = Weight.joins(:service).where(services: {code: 'NED'})
ned_service_weights_degree_id = {}
ned_service_weights.each do |weight|
  ned_service_weights_degree_id[weight.degree] = weight.id
end

rates = [
  [ned_service_weights_degree_id[1], Area.id_by_code('A'), 8000],
  [ned_service_weights_degree_id[1], Area.id_by_code('B'), 8000],
  [ned_service_weights_degree_id[1], Area.id_by_code('C'), 8000],
  [ned_service_weights_degree_id[1], Area.id_by_code('D'), 8500],
  [ned_service_weights_degree_id[1], Area.id_by_code('E'), 8500],
  [ned_service_weights_degree_id[1], Area.id_by_code('F'), 9500],
  [ned_service_weights_degree_id[1], Area.id_by_code('G'), 9500],
  [ned_service_weights_degree_id[1], Area.id_by_code('H'), 9500],
  [ned_service_weights_degree_id[1], Area.id_by_code('I'), 9500],

  [ned_service_weights_degree_id[2], Area.id_by_code('A'), 8000],
  [ned_service_weights_degree_id[2], Area.id_by_code('B'), 12500],
  [ned_service_weights_degree_id[2], Area.id_by_code('C'), 12500],
  [ned_service_weights_degree_id[2], Area.id_by_code('D'), 14500],
  [ned_service_weights_degree_id[2], Area.id_by_code('E'), 14500],
  [ned_service_weights_degree_id[2], Area.id_by_code('F'), 15000],
  [ned_service_weights_degree_id[2], Area.id_by_code('G'), 15000],
  [ned_service_weights_degree_id[2], Area.id_by_code('H'), 15000],
  [ned_service_weights_degree_id[2], Area.id_by_code('I'), 17500],

  [ned_service_weights_degree_id[3], Area.id_by_code('A'), 10500],
  [ned_service_weights_degree_id[3], Area.id_by_code('B'), 17100],
  [ned_service_weights_degree_id[3], Area.id_by_code('C'), 19000],
  [ned_service_weights_degree_id[3], Area.id_by_code('D'), 21300],
  [ned_service_weights_degree_id[3], Area.id_by_code('E'), 21900],
  [ned_service_weights_degree_id[3], Area.id_by_code('F'), 22400],
  [ned_service_weights_degree_id[3], Area.id_by_code('G'), 23300],
  [ned_service_weights_degree_id[3], Area.id_by_code('H'), 21400],
  [ned_service_weights_degree_id[3], Area.id_by_code('I'), 27000],

  [ned_service_weights_degree_id[4], Area.id_by_code('A'), 13300],
  [ned_service_weights_degree_id[4], Area.id_by_code('B'), 23500],
  [ned_service_weights_degree_id[4], Area.id_by_code('C'), 26200],
  [ned_service_weights_degree_id[4], Area.id_by_code('D'), 30000],
  [ned_service_weights_degree_id[4], Area.id_by_code('E'), 32200],
  [ned_service_weights_degree_id[4], Area.id_by_code('F'), 33300],
  [ned_service_weights_degree_id[4], Area.id_by_code('G'), 34600],
  [ned_service_weights_degree_id[4], Area.id_by_code('H'), 28400],
  [ned_service_weights_degree_id[4], Area.id_by_code('I'), 38700],

  [ned_service_weights_degree_id[5], Area.id_by_code('A'), 13800],
  [ned_service_weights_degree_id[5], Area.id_by_code('B'), 29000],
  [ned_service_weights_degree_id[5], Area.id_by_code('C'), 33700],
  [ned_service_weights_degree_id[5], Area.id_by_code('D'), 39400],
  [ned_service_weights_degree_id[5], Area.id_by_code('E'), 43000],
  [ned_service_weights_degree_id[5], Area.id_by_code('F'), 44000],
  [ned_service_weights_degree_id[5], Area.id_by_code('G'), 45000],
  [ned_service_weights_degree_id[5], Area.id_by_code('H'), 38000],
  [ned_service_weights_degree_id[5], Area.id_by_code('I'), 48200],

  [ned_service_weights_degree_id[6], Area.id_by_code('A'), 17100],
  [ned_service_weights_degree_id[6], Area.id_by_code('B'), 39400],
  [ned_service_weights_degree_id[6], Area.id_by_code('C'), 45600],
  [ned_service_weights_degree_id[6], Area.id_by_code('D'), 46000],
  [ned_service_weights_degree_id[6], Area.id_by_code('E'), 51000],
  [ned_service_weights_degree_id[6], Area.id_by_code('F'), 54000],
  [ned_service_weights_degree_id[6], Area.id_by_code('G'), 54000],
  [ned_service_weights_degree_id[6], Area.id_by_code('H'), 46000],
  [ned_service_weights_degree_id[6], Area.id_by_code('I'), 63000],

  [ned_service_weights_degree_id[7], Area.id_by_code('A'), 18000],
  [ned_service_weights_degree_id[7], Area.id_by_code('B'), 47000],
  [ned_service_weights_degree_id[7], Area.id_by_code('C'), 54000],
  [ned_service_weights_degree_id[7], Area.id_by_code('D'), 55000],
  [ned_service_weights_degree_id[7], Area.id_by_code('E'), 58000],
  [ned_service_weights_degree_id[7], Area.id_by_code('F'), 60000],
  [ned_service_weights_degree_id[7], Area.id_by_code('G'), 62000],
  [ned_service_weights_degree_id[7], Area.id_by_code('H'), 54000],
  [ned_service_weights_degree_id[7], Area.id_by_code('I'), 68000],

  [ned_service_weights_degree_id[0], Area.id_by_code('A'), 2000],
  [ned_service_weights_degree_id[0], Area.id_by_code('B'), 2900],
  [ned_service_weights_degree_id[0], Area.id_by_code('C'), 3900],
  [ned_service_weights_degree_id[0], Area.id_by_code('D'), 4700],
  [ned_service_weights_degree_id[0], Area.id_by_code('E'), 7300],
  [ned_service_weights_degree_id[0], Area.id_by_code('F'), 8400],
  [ned_service_weights_degree_id[0], Area.id_by_code('G'), 8500],
  [ned_service_weights_degree_id[0], Area.id_by_code('H'), 7000],
  [ned_service_weights_degree_id[0], Area.id_by_code('I'), 8500],
]


def sql(rate_data)
  """
    INSERT INTO rates(weight_id, destination_area_id, price, created_at, updated_at)
    VALUES ('#{rate_data[0]}', '#{rate_data[1]}', '#{rate_data[2]}', '#{Time.zone.now}', '#{Time.zone.now}')
  """
end

connection = ActiveRecord::Base.connection()

ActiveRecord::Base.transaction do
  rates.each do |rate_data|
    connection.execute(sql(rate_data))
  end
end
