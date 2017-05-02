areas = 'A'..'I'

def sql(code)
  """
    INSERT INTO areas(code, created_at, updated_at)
    VALUES ('#{code}', '#{Time.zone.now}', '#{Time.zone.now}')
  """
end

connection = ActiveRecord::Base.connection()

ActiveRecord::Base.transaction do
  areas.each do |code|
    connection.execute(sql(code))
  end
end
