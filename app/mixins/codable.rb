module Codable
  def by_code(code)
    find_by(code: code)
  end

  def id_by_code(code)
    by_code(code).id
  end
end
