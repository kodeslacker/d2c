require 'rubygems'
require 'sinatra'

get '/test' do
  'HELLO WORLD!'
end

get 'test2' do
  'Hello world again'
end