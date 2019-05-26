class CreateMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :imdb_id
      t.references :movie_list, foreign_key: true

      t.timestamps
    end
  end
end
