require_relative '../Models/Consumer'
require 'oj'

post '/submitConsumer' do
  newConsumer= JSON.parse request.body.read
  unless Consumer.exists?(:name=>newConsumer['name'],:consumerType=>newConsumer['consumerType'])
    Consumer.create(:name=>newConsumer['name'],
                    :consumerType=>newConsumer['consumerType'],
                    :consumption=>newConsumer['consumption'],
                    :status=>newConsumer['status'],
                    :uptime=>newConsumer['uptime'])
    return 'created'
  end
  Consumer.where(:name=>newConsumer['name'],:consumerType=>newConsumer['consumerType']).update(
      :consumption=>newConsumer['consumption'],
      :status=>newConsumer['status'],
      :uptime=>newConsumer['uptime'],)
  return 'updated'
end

get '/getAllConsumers' do
  return Oj.dump(Consumer.find(:all))
end

#================================

post '/submitConsumerUpdate' do
  newConsumerUpdate= JSON.parse request.body.read
  unless ConsumerUpdate.exists?(:status=>newConsumerUpdate['status'],
                                :name=>newConsumerUpdate['name'],
                                :consumerType=>newConsumerUpdate['consumerType'])
    ConsumerUpdate.create(:status=>newConsumerUpdate['status'],
                           :name=>newConsumerUpdate['name'],
                           :consumerType=>newConsumerUpdate['consumerType'])
    return 'created'
  end
  ConsumerUpdate.where(:name=>newConsumerUpdate['name'],
                       :consumerType=>newConsumerUpdate['consumerType']).update(:status=>newConsumerUpdate['status'])
end

get '/getAllConsumerUpdate' do
  return Oj.dump(ConsumerUpdate.find(:all))
end


