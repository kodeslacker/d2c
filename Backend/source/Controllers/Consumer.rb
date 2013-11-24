require_relative '../Models/Consumer'
require_relative '../Models/Toast'
require 'oj'

post '/submitConsumer' do
  newConsumer= JSON.parse request.body.read
  Consumer.create(:name => newConsumer['name'],
                  :consumerType => newConsumer['consumerType'],
                  :consumption => newConsumer['consumption'],
                  :status => newConsumer['status'],
                  :inserted_at => newConsumer['inserted_at']
  )
  'Got It!'
end

post '/submitBulkConsumers' do

  allConsumers = JSON.parse request.body.read

  allConsumers.each do |newConsumer|
    Consumer.create(:name => newConsumer['name'],
                  :consumerType => newConsumer['consumerType'],
                  :consumption => newConsumer['consumption'],
                  :status => newConsumer['status'],
                  :inserted_at => newConsumer['inserted_at']
    )
  end

  'Got It!'
end

get '/getAllConsumers' do
  val= Consumer.all( :select=> 'DISTINCT consumerType, name').map { |c| Consumer.where(consumerType: c.consumerType, name: c.name).order('created_at DESC').first }
  Oj.dump(val)
end

get '/getBulkConsumers' do
  Oj.dump(Consumer.find(:all))
end
#================================


#======= Vararu while hungry code =====
get '/getCharts' do
  # hackathon code please do not read while sober
  yesterday1 = Consumer.where(:inserted_at => (Date.yesterday.beginning_of_day)..(Date.yesterday.beginning_of_day + 4.hours))
  yesterday2 = Consumer.where(:inserted_at => (Date.yesterday.beginning_of_day + 4.hours)..(Date.yesterday.beginning_of_day + 8.hours))
  yesterday3 = Consumer.where(:inserted_at => (Date.yesterday.beginning_of_day + 8.hours)..(Date.yesterday.beginning_of_day + 12.hours))
  yesterday4 = Consumer.where(:inserted_at => (Date.yesterday.beginning_of_day + 12.hours)..(Date.yesterday.beginning_of_day + 16.hours))
  yesterday5 = Consumer.where(:inserted_at => (Date.yesterday.beginning_of_day + 16.hours)..(Date.yesterday.beginning_of_day + 20.hours))
  yesterday6 = Consumer.where(:inserted_at => (Date.yesterday.beginning_of_day + 20.hours)..(Date.today.beginning_of_day))
  labels = []
  sum1 = 0
  yesterday1.map { |c| sum1 += c.consumption.to_i }
  avg1 = sum1 / yesterday1.count if yesterday1.count != 0
  labels << avg1

  sum2 = 0
  yesterday2.map { |c| sum2 += c.consumption.to_i }
  avg2 = sum2 / yesterday2.count if yesterday2.count != 0
  labels << avg2

  sum3 = 0
  yesterday3.map { |c| sum3 += c.consumption.to_i }
  avg3 = sum3 / yesterday3.count if yesterday3.count != 0
  labels << avg3

  sum4 = 0
  yesterday4.map { |c| sum4 += c.consumption.to_i }
  avg4 = sum4 / yesterday4.count if yesterday4.count != 0
  labels << avg4

  sum5 = 0
  yesterday5.map { |c| sum5 += c.consumption.to_i }
  avg5 = sum5 / yesterday5.count if yesterday5.count != 0
  labels << avg5

  sum6 = 0
  yesterday6.map { |c| sum6 += c.consumption.to_i }
  avg6 = sum6 / yesterday6.count if yesterday6.count != 0
  labels << avg6

  Oj.dump(labels)
end

#======= End of WTF CODE =======
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
  updates=ConsumerUpdate.find(:all).clone
  ConsumerUpdate.delete_all
  Oj.dump updates
end


