
exports.up = function (knex) {
    return knex.schema
        .createTable("users", tbl => {
            tbl.increments();
            tbl.string("username", 128).notNullable().unique();
            tbl.string("password", 256).notNullable();
            tbl.string("firstName", 128).notNullable();
            tbl.string("lastName", 256).notNullable();
        })
        .createTable("songs", tbl => {
            tbl.string("artist", 256).notNullable();
            tbl.string("title", 256).notNullable();
            tbl.string("albumCover", 256).notNullable();
            tbl.string("id").notNullable().primary();
            tbl.string("album", 256).notNullable();
        })
        .createTable("playlists", tbl => {
            tbl.increments();
            tbl.string("playlist_name").notNullable();
            tbl.integer("user_id")
                .unsigned()
                .notNullable()
                .references("users.id")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
        })
        .createTable("playlist_songs", tbl => {
            tbl.string("song_id").unsigned().notNullable().references("songs.id").onDelete("CASCADE").onUpdate("CASCADE");
            tbl.integer("playlist_id").unsigned().notNullable().references("playlists.id").onDelete("CASCADE").onUpdate("CASCADE");
            tbl.primary(["song_id", "playlist_id"]);
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('playlist_songs')
        .dropTableIfExists("playlists")
        .dropTableIfExists("songs")
        .dropTableIfExists('users');
};
