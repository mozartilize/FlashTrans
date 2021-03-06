class Api::V1::UsersController < DeviseTokenAuth::RegistrationsController
  before_action :authenticate_api_user!
  skip_before_action :authenticate_api_user!, if: :signup_request?
  skip_before_action :verify_authenticity_token, only: :create
  skip_after_action :update_auth_header, only: :create, if: "!!current_api_user"


  def index
    render json: User.all, status: 200
  end

  private

  def sign_up_params
    user_data = params.require(:user)
                      .permit(:first_name, :last_name,
                              :birthday, :address, :phone_number,
                              :email)
    if current_api_user && current_api_user.role_name == 'admin'
      user_data[:role_id] = Role.id_by_name(name: 'shipper')
      passwords = Rails.env.production? ? \
        {password: user_data[:birthday], password_confirmation: user_data[:birthday]} :
        {password: 'password', password_confirmation: 'password'}
      user_data.merge!(passwords)
    else
      user_data.merge!(params.require(:user)
                             .permit(:password, :password_confirmation))
      user_data[:role_id] = Role.id_by_name(name: 'user')
    end
    user_data
  end


  def account_update_params
    params.require(:user).permit(:first_name, :last_name,
                                 :birthday, :address, :phone_number,
                                 :email,
                                 :password, :password_confirmation,
                                 :current_password)
  end

  def signup_request?
    set_user_by_token
    current_api_user && current_api_user.role_name == 'admin' ? false : true
  end
end
