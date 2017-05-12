function presence(field, value) {
  const error = {}
  error[field] = value === '' ? 'is required' : ''
  return error
}
