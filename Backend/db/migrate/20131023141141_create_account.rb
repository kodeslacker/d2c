class CreateAccount < ActiveRecord::Migration
  def up
    create_table :Accounts do |table|
      table.string :email
      table.string :cui
      table.string :password
    end

  end

  def down
    drop_table :Accounts
  end
end
