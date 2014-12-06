###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

configure :development do
  activate :jasmine
end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'assets/stylesheets'
set :images_dir, 'assets/images'
set :js_dir, 'assets/javascripts'
set :fonts_dir, 'assets/fonts'

ignore 'assets/javascripts/app.jsx'

activate :react

activate :deploy do |deploy|
  deploy.method = :rsync
  deploy.host = 'mumineencalendar.com'
  deploy.path = '/home/public'
  deploy.clean = true
  deploy.build_before = true
end

# Build-specific configuration
configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

after_configuration do
  sprockets.append_path '/vendor/assets/'
  sprockets.append_path File.dirname(::React::Source.bundled_path_for('react.js'))
end
