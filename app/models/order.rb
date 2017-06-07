class Order < ApplicationRecord
  extend Codable

  belongs_to :service
  belongs_to :user
  has_one :shipment
  belongs_to :status, class_name: 'OrderStatus', foreign_key: :status_id
  belongs_to :source_address, class_name: 'Address', foreign_key: :source_address_id
  belongs_to :destination_address, class_name: 'Address', foreign_key: :destination_address_id

  scope :by_user_id, ->(user_id) { where(user_id: user_id) }

  scope :by_shipper_id, ->(shipper_id) {
    joins(:shipment).where(shipments: { shipper_id: shipper_id })
  }

  scope :latest_ordered, -> { order(created_at: :desc) }

  def self.order_per_day
    records =
      group('created_at::date')
      .select('created_at::date AS date,
               count(created_at::date) AS number_of_order')
    (records.map(&:number_of_order).sum / records.size.to_f).ceil
  end

  def self.delivered_per_day
    records =
      joins(:shipment)
      .group('shipments.delivered_at::date')
      .select('shipments.delivered_at::date AS date,
               count(shipments.delivered_at::date) AS number_of_order')
    (records.map(&:number_of_order).sum / records.size.to_f).ceil
  end

  def self.five_days_stat
    days = 5.days.ago.to_date..Date.today
    receivered_orders = {}
    delivered_orders = {}
    days.each do |day|
      receivered_orders[day] = 0
      delivered_orders[day] = 0
    end
    receivered_orders.merge!(where('created_at::date IN (?)', days).group("created_at::date").count)
    delivered_orders.merge!(joins(:shipment).where('shipments.delivered_at::date IN (?)', days)
                                            .group("shipments.delivered_at::date").count)
    {
      days: days.map { |day| day.strftime('%m-%d') },
      receivered: receivered_orders.values,
      delivered: delivered_orders.values
    }
  end

  scope :assigned_ready, -> {
    joins(:status).where(order_statuses: {status: 'unprocessed'})
      .or(joins(:status).where(order_statuses: {status: 'assigned'}))
  }

  scope :by_status, ->(status) {
    if status == 'assigned_ready'
      assigned_ready
    else
      joins(:status).where(order_statuses: {status: status})
    end
  }
end
