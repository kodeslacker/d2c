class CreateConsumers < ActiveRecord::Migration
  def up
    create_table :consumers do |t|
      t.string :status
      t.string :consumerType
      t.string :consumption
      t.string :name
      t.string :uptime
    end
    Consumer.create(:status=>'73%',:consumerType=>'caca',:consumption=>'20W',:name=>'Kitchen light',:uptime=>'4h')
  end

  def down
    drop_table :consumers
  end
end



