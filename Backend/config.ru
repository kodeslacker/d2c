
require 'rubygems'
require 'sinatra'
require 'rack/reloader'
require './SABi'

set :environment, :development

configure(:production){puts 'Running SABi in production mode!'}

configure :development do
  puts 'Running SABi in development mode'
end

run Sinatra::Application
