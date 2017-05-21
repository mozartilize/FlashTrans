module Errors
  def humanized(error_hash)
    error_hash.map { |k, v| "#{k} #{v.join(',')}".capitalize }
  end
end
