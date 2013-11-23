require 'sinatra'
require 'rack'
require 'sinatra/activerecord'


#Settings
set :port, 5445
set :database, 'sqlite3:///d2c.db'
set :protection, false
set :protection, except: :http_origin

#CORS enable
before do
  headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
  headers['Access-Control-Allow-Origin'] = '*'
  headers['Access-Control-Allow-Headers'] = 'accept, authorization, origin'
end



options '*' do
  response.headers['Allow'] = 'HEAD,GET,PUT,DELETE,OPTIONS,POST'
  # Needed for AngularJS
  response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept'
  200
end

Dir['source/Controllers/**/*.rb'].each do |file|
  puts "Loading #{file}\n"
  require File.expand_path(file)
end