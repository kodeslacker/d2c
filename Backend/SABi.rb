require 'sinatra'
require 'sinatra/activerecord'

Dir['source/Controllers/**/*.rb'].each do |file|
  puts "Loading #{file}\n"
  require File.expand_path(file)
end

set :database, 'sqlite3:///SABi.db'

