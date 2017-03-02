class CreateCountNumbers < ActiveRecord::Migration[5.0]
  def change
    create_table :count_numbers do |t|
      t.integer :value

      t.timestamps
    end
  end
end
