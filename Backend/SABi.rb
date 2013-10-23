require 'sinatra'
require 'sinatra/activerecord'

#CORS enable
before do
  headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
  headers['Access-Control-Allow-Origin'] = '*'
  headers['Access-Control-Allow-Headers'] = 'accept, authorization, origin'
end

Dir['source/Controllers/**/*.rb'].each do |file|
  puts "Loading #{file}\n"
  require File.expand_path(file)
end


set :database, 'sqlite3:///SABi.db'

