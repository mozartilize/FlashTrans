class Role < ApplicationRecord
  has_many :users

  scope :by_name, ->(name:) { find_by(name: name) }
  scope :id_by_name, ->(name:) { by_name(name: name).id }
end
