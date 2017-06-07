class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
  # this overrides `DeviseTokenAuth::Concerns::User`,
  # so put it after `include DeviseTokenAuth::Concerns::User`
  include Concerns::User

  before_create :skip_confirmation!, if: "role_name == 'shipper'"

  belongs_to :role
  has_many :orders
  has_many :shipments, through: :orders

  validates :address, presence: true
  validates :last_name, presence: true
  validates :first_name, presence: true
  validates :phone_number, numericality: true,
                           length: {minimum: 10, maximum: 15}
  validates_date :birthday, :before => lambda { 16.years.ago }

  delegate :name, to: :role, prefix: true

  scope :shippers, -> { joins(:role).where(roles: {name: 'shipper'}) }
end
