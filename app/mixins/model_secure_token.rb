module ModelSecureToken
  def self.generate(half_len:, model:, attribute:)
    loop do
      token = SecureRandom.hex(half_len)
      break token unless model.where(attribute => token).exists?
    end
  end
end
