defmodule Bookshelf.Repo.Migrations.AddAuthorIdToBooks do
  use Ecto.Migration

  def change do
    alter table(:books) do
      add(:author_id, references(:authors))
    end

    create(index(:books, [:author_id]))
  end
end
