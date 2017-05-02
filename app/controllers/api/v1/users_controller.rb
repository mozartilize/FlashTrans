class Api::V1::UsersController < DeviseTokenAuth::RegistrationsController
  skip_before_action :authenticate_api_user!,
                     if: proc { |c|
                       controller_referrer = Rails.application.routes.recognize_path(request.referrer)
                       c.action_name == 'create' &&
                       controller_referrer[:controller] == 'users'
                     }
  skip_before_action :verify_authenticity_token, only: :create


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
end
