activate :dotenv

configure :development do
  activate :jasmine
end

set :css_dir, "assets/stylesheets"
set :images_dir, "assets/images"
set :js_dir, "assets/javascripts"
set :fonts_dir, "assets/fonts"

ignore "assets/javascripts/app.jsx"

activate :react

activate :google_analytics do |ga|
  ga.domain_name = ENV.fetch("GA_DOMAIN_NAME")
  ga.tracking_id = ENV.fetch("GA_TRACKING_ID")
  ga.development = false
  ga.minify = true
end

activate :deploy do |deploy|
  deploy.method = :git
  deploy.clean = true
  deploy.build_before = true
end

configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :asset_hash
end

after_configuration do
  sprockets.append_path "/vendor/assets/"
  sprockets.append_path(
    File.dirname(::React::Source.bundled_path_for("react.js"))
  )
end
