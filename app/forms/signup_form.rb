class SignupForm < Reform::Form
  property :last_name
  property :first_name
  property :birthday
  property :email
  property :password
  property :password_confirmation, virtual: true
  property :address
  property :phone_number

  validation do
    required(:last_name).filled
    required(:first_name).filled
    required(:email).filled
    required(:password).filled
  end
end
