class ApiController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  before_action :authenticate_api_user!
  before_action :set_response_headers

  def set_response_headers
    # TODO: Remove this once the following issue is fixed in DTA
    # https://github.com/lynndylanhurley/devise_token_auth/issues/702
    # response.headers["Cache-Control"] = "no-cache, no-store"
    return unless api_user_signed_in? || response.headers[DeviseTokenAuth.headers_names[:'access-token']].nil?
    auth_header = {
      DeviseTokenAuth.headers_names[:'access-token'] => '',
      DeviseTokenAuth.headers_names[:client] => '',
      DeviseTokenAuth.headers_names[:expiry] => ''
    }
    response.headers.merge!(auth_header)
  end
end
