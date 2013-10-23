require 'rubygems'
require 'sinatra'
require './SABi'


set :environment, :development

configure(:production){puts 'Running SABi in production mode!'}

configure :development do
  puts 'Running SABi in development mode'
  enable :cross_origin
end

run Sinatra::Application
