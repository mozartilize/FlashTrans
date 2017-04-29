class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
  # this overrides `DeviseTokenAuth::Concerns::User`,
  # so put it after `include DeviseTokenAuth::Concerns::User`
  include Concerns::User

  belongs_to :role

  delegate :name, to: :role, prefix: true

  scope :shippers, -> { joins(:role).where(roles: {name: 'shipper'}) }
end
