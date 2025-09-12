use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // posts
        manager
            .create_table(
                Table::create()
                    .table(Posts::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Posts::Id)
                            .big_integer()
                            .not_null()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Posts::AuthorId).big_integer().not_null())
                    .col(ColumnDef::new(Posts::Text).text().not_null())
                    .col(ColumnDef::new(Posts::Cw).text().null())
                    .col(ColumnDef::new(Posts::Visibility).small_integer().not_null())
                    .col(ColumnDef::new(Posts::ReplyToId).big_integer().null())
                    .col(ColumnDef::new(Posts::RepostOfId).big_integer().null())
                    .col(ColumnDef::new(Posts::Tags).json_binary().not_null())
                    .col(ColumnDef::new(Posts::Mentions).json_binary().not_null())
                    .col(ColumnDef::new(Posts::Attachments).json_binary().not_null())
                    .col(
                        ColumnDef::new(Posts::CreatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Posts::UpdatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Posts::EditedAt)
                            .timestamp_with_time_zone()
                            .null(),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .from(Posts::Table, Posts::AuthorId)
                            .to(Users::Table, Users::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await?;

        // Create indexes separately
        manager
            .create_index(
                Index::create()
                    .name("idx_posts_author_created")
                    .table(Posts::Table)
                    .col(Posts::AuthorId)
                    .col(Posts::CreatedAt)
                    .to_owned(),
            )
            .await?;

        manager
            .create_index(
                Index::create()
                    .name("idx_posts_visibility_created")
                    .table(Posts::Table)
                    .col(Posts::Visibility)
                    .col(Posts::CreatedAt)
                    .to_owned(),
            )
            .await?;

        manager
            .create_index(
                Index::create()
                    .name("idx_posts_reply_to")
                    .table(Posts::Table)
                    .col(Posts::ReplyToId)
                    .to_owned(),
            )
            .await?;

        manager
            .create_index(
                Index::create()
                    .name("idx_posts_repost_of")
                    .table(Posts::Table)
                    .col(Posts::RepostOfId)
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Posts::Table).to_owned())
            .await?;
        Ok(())
    }
}

#[derive(DeriveIden)]
enum Posts {
    Table,
    Id,
    AuthorId,
    Text,
    Cw,
    Visibility,
    ReplyToId,
    RepostOfId,
    Tags,
    Mentions,
    Attachments,
    CreatedAt,
    UpdatedAt,
    EditedAt,
}

#[derive(DeriveIden)]
enum Users {
    Table,
    Id,
}
