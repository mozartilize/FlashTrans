# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Role.create([{name: 'admin'}, {name: 'shipper'}, {name: 'user'}])

User.create(email: 'admin@flashtrans.com', last_name: 'Ha', first_name: 'Tran', birthday: '19940702', phone_number: '01206223037', role_id: Role.find_by(name: 'admin').id, password: 'password', password_confirmation: 'password')
