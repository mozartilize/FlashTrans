module Concerns::User
  extend ActiveSupport::Concern

  def token_validation_response
    self.as_json(except: [
      :role_id, :tokens, :created_at, :updated_at
    ])
    .merge('role' => role.as_json(except: [:created_at, :updated_at]))
  end
end