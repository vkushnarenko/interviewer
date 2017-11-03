class AddRatingRefToInterview < ActiveRecord::Migration[5.1]
  def change
    add_reference :interviews, :rating, foreign_key: true
  end
end
