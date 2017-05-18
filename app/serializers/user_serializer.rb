class UserSerializer < ActiveModel::Serializer
  attributes :id,
             :address,
             :last_name,
             :first_name,
             :phone_number,
             :email,
             :role,
             :full_name

  def full_name
    "#{object.first_name} #{object.last_name}"
  end

  def role
    RoleSerializer.new(object.role).attributes
  end
end
