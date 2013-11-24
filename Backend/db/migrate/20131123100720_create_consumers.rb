class CreateConsumers < ActiveRecord::Migration
  def up
    create_table :consumers do |t|
      t.string :status
      t.string :consumerType
      t.string :consumption
      t.string :name
      t.string :inserted_at
      t.timestamps
    end
  end

  def down
    drop_table :consumers
  end
end



