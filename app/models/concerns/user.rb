module Concerns::User
  extend ActiveSupport::Concern

  def token_validation_response
    UserSerializer.new(self).as_json
  end
end
