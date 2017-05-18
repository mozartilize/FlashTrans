# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w(
  vendors/index.js
  home/index.js
  login/index.js
  signup/index.js
  management_admin_shippers/index.js
  management_admin_rates/index.js
  management_admin_shipments/index.js
  management_shipper_shipments/index.js
  management_user_orders/index.js
)
