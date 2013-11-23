require_relative '../Models/Consumer'
require_relative '../Models/Toast'
require 'oj'

post '/submitConsumer' do
  newConsumer= JSON.parse request.body.read
  unless Consumer.exists?(:name => newConsumer['name'], :consumerType => newConsumer['consumerType'])
    Consumer.create(:name => newConsumer['name'],
                    :consumerType => newConsumer['consumerType'],
                    :consumption => newConsumer['consumption'],
                    :status => newConsumer['status'],
                    :uptime => newConsumer['uptime'])
    return 'created'
  end
  Consumer.where(:name => newConsumer['name'], :consumerType => newConsumer['consumerType']).update(
      :consumption => newConsumer['consumption'],
      :status => newConsumer['status'],
      :uptime => newConsumer['uptime'],)
  return 'updated'
end

get '/getAllConsumers' do
  val= Consumer.all( :select=> 'DISTINCT consumerType, name').map { |c| Consumer.where(consumerType: c.consumerType, name: c.name).order('created_at DESC').first }
  Oj.dump(val)
end

#================================

post '/submitConsumerUpdate' do
  newConsumerUpdate= JSON.parse request.body.read


  ConsumerUpdate.create(:status => newConsumerUpdate['status'],
                        :name => newConsumerUpdate['name'],
                        :consumerType => newConsumerUpdate['consumerType'])
  timeout=5
  while timeout!=0 and newConsumerUpdate['id'] == Consumer.where(consumerType: newConsumerUpdate['consumerType'], name: newConsumerUpdate['name']).order('created_at DESC').first[:id]
    sleep(1)
    timeout=timeout-1
  end
    unless timeout==0
      return Oj.dump(Toast.new('status was updated',newConsumerUpdate['name'], 'success'))
    end
      return Oj.dump(Toast.new('it looks like domus did not respond','Oops!','error'))
end

get '/getAllConsumerUpdate' do
  updates=ConsumerUpdate.find(:all)
  return updates
end

get '/doSimulation' do
  Consumer.create(:status=>'73',:consumerType=>'caca',:consumption=>'20W',:name=>'Kitchen light 2')
  return 'shit done'
end


