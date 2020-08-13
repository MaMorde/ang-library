defmodule Bookshelf.Repo.Migrations.CreateAuthorsTable do
  use Ecto.Migration

  def change do
    create table(:authors) do
      add :name, :string, required: true
      add :surname, :string, required: true
    end
  end
end
