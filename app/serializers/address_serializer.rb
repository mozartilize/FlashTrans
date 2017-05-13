class AddressSerializer < ActiveModel::Serializer
  attributes :street_no, :street_name
  belongs_to :city
end
