require 'rubygems'
require 'sinatra'
require './d2c'


set :environment, :development

configure(:production){puts 'Running d2c in production mode!'}

configure :development do
  puts 'Running d2c in development mode'
end

run Sinatra::Application
