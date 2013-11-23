get '/getDomusCode' do
  return (('a'..'z').to_a+(0..9).to_a).shuffle.join[0..5]
end

get '/checkDomusCode/:code' do
  return 'true';
end