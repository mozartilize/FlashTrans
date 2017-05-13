class ApiController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Extends::ResponseHeaders

  before_action :authenticate_api_user!
end
