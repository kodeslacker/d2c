require './SABi'

configure(:production){puts 'Running SABi in production mode!'}
configure(:development){puts 'Running SABi in development mode!'}

run Sinatra::Application.new
