module Extends::ResponseHeaders

  def self.included(base)
    base.class_eval do
      before_action :set_response_headers
    end
  end

  def set_response_headers
    binding.pry
    # TODO: Remove this once the following issue is fixed in DTA
    # https://github.com/lynndylanhurley/devise_token_auth/issues/702
    # response.headers["Cache-Control"] = "no-cache, no-store"
    return unless (api_user_signed_in? || response.headers[DeviseTokenAuth.headers_names[:'access-token']].nil?)
    auth_header = {
      DeviseTokenAuth.headers_names[:'access-token'] => ' ',
      DeviseTokenAuth.headers_names[:client] => ' ',
      DeviseTokenAuth.headers_names[:expiry] => ' '
    }
    response.headers.merge!(auth_header)
  end
end
