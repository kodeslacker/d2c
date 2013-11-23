class CreateConsumerUpdates < ActiveRecord::Migration
  def up
    create_table :consumer_updates do |t|
      t.string :status
      t.string :name
      t.string :consumerType
    end
    ConsumerUpdate.create(:status=>'2%',:name=>'Kitchen light',:consumerType=>'caca')
  end

  def down
    drop_table :consumer_updates
  end
end
