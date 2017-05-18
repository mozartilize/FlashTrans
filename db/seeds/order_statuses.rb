statuses = ['unprocessed', 'assigned', 'delivering', 'delivered']

ActiveRecord::Base.transaction do
  statuses.each do |status|
    OrderStatus.create(status: status)
  end
end
