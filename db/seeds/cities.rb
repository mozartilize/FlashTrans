cities = [
  ["An Giang", Area.id_by_code('I')],
  ["Bà Rịa - Vũng Tàu", Area.id_by_code('G')],
  ["Bắc Giang", Area.id_by_code('I')],
  ["Bắc Cạn", Area.id_by_code('C')],
  ["Bạc Liêu", Area.id_by_code('I')],
  ["Bắc Ninh", Area.id_by_code('C')],
  ["Bến Tre", Area.id_by_code('I')],
  ["Bình Định", Area.id_by_code('I')],
  ["Bình Dương", Area.id_by_code('G')],
  ["Bình Phước", Area.id_by_code('I')],
  ["Bình Thuận", Area.id_by_code('I')],
  ["Cà Mau", Area.id_by_code('I')],
  ["Cần Thơ", Area.id_by_code('I')],
  ["Cao Bằng", Area.id_by_code('I')],
  ["Đà Nẵng", Area.id_by_code('E')],
  ["Đắk Lắk", Area.id_by_code('I')],
  ["Đắk Nông", Area.id_by_code('I')],
  ["Điện Biên", Area.id_by_code('I')],
  ["Đồng Nai", Area.id_by_code('G')],
  ["Đồng Tháp", Area.id_by_code('I')],
  ["Gia Lai", Area.id_by_code('I')],
  ["Hà Giang", Area.id_by_code('I')],
  ["Hà Nam", Area.id_by_code('D')],
  ["Hà Nội", Area.id_by_code('A')],
  ["Hà Tĩnh", Area.id_by_code('D')],
  ["Hải Dương", Area.id_by_code('B')],
  ["Hải Phòng", Area.id_by_code('B')],
  ["Hậu Giang", Area.id_by_code('I')],
  ["Hòa Bình", Area.id_by_code('H')],
  ["Hồ Chí Minh", Area.id_by_code('F')],
  ["Hưng Yên", Area.id_by_code('C')],
  ["Khánh Hòa", Area.id_by_code('F')],
  ["Kiên Giang", Area.id_by_code('I')],
  ["Kon Tum", Area.id_by_code('I')],
  ["Lai Châu", Area.id_by_code('I')],
  ["Lâm Đồng", Area.id_by_code('I')],
  ["Lạng Sơn", Area.id_by_code('H')],
  ["Lào Cai", Area.id_by_code('I')],
  ["Long An", Area.id_by_code('I')],
  ["Nam Định", Area.id_by_code('C')],
  ["Nghệ An", Area.id_by_code('D')],
  ["Ninh Bình", Area.id_by_code('D')],
  ["Ninh Thuận", Area.id_by_code('I')],
  ["Phú Thọ", Area.id_by_code('D')],
  ["Phú Yên", Area.id_by_code('I')],
  ["Quảng Bình", Area.id_by_code('I')],
  ["Quảng Nam", Area.id_by_code('F')],
  ["Quảng Ngãi", Area.id_by_code('F')],
  ["Quảng Ninh", Area.id_by_code('D')],
  ["Quảng Trị", Area.id_by_code('F')],
  ["Sóc Trăng", Area.id_by_code('I')],
  ["Sơn La", Area.id_by_code('I')],
  ["Tây Ninh", Area.id_by_code('I')],
  ["Thái Bình", Area.id_by_code('C')],
  ["Thái Nguyên", Area.id_by_code('H')],
  ["Thanh Hóa", Area.id_by_code('D')],
  ["Thừa Thiên Huế", Area.id_by_code('E')],
  ["Tiền Giang", Area.id_by_code('I')],
  ["Trà Vinh", Area.id_by_code('I')],
  ["Tuyên Quang", Area.id_by_code('I')],
  ["Vĩnh Long", Area.id_by_code('I')],
  ["Vĩnh Phúc", Area.id_by_code('C')],
  ["Yên Bái", Area.id_by_code('H')],
]

def sql(city_data)
  """
    INSERT INTO cities(name, area_id, created_at, updated_at)
    VALUES ('#{city_data[0]}', '#{city_data[1]}', '#{Time.zone.now}', '#{Time.zone.now}')
  """
end

connection = ActiveRecord::Base.connection

ActiveRecord::Base.transaction do
  cities.each do |city_data|
    connection.execute(sql(city_data))
  end
end
