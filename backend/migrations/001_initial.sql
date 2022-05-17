CREATE TABLE images (
    id INTEGER PRIMARY KEY NOT NULL,
    key TEXT NOT NULL UNIQUE, -- used for filesystem path and in API responses
    uploader_key TEXT NOT NULL,
    created_at INTEGER NOT NULL, -- time since unix epoch (unix ts)

    CONSTRAINT fk_uploader_key_assoc
        FOREIGN KEY (uploader_key)
        REFERENCES users (key)
        ON DELETE CASCADE
) STRICT;

CREATE INDEX images_key_idx
ON images (key);

CREATE TABLE albums (
    id INTEGER PRIMARY KEY NOT NULL,
    key TEXT NOT NULL UNIQUE, -- used in API responses
    title TEXT NOT NULL,
    description TEXT NULL,
    cover_key TEXT NULL,
    locations TEXT NULL,
    uploader_key TEXT NOT NULL,
    draft INTEGER NOT NULL DEFAULT 0, -- boolean

    -- timeframe of the event covered by this album
    timeframe_from INTEGER NULL, -- unix ts
    timeframe_to INTEGER NULL, -- unix ts

    created_at INTEGER NOT NULL, -- unix ts

    CONSTRAINT fk_uploader_key_assoc
        FOREIGN KEY (uploader_key)
        REFERENCES users (key)
        ON DELETE CASCADE

    CONSTRAINT fk_cover_key_assoc
        FOREIGN KEY (cover_key)
        REFERENCES images (key)
) STRICT;

CREATE INDEX albums_key_idx
ON albums (key);

CREATE TABLE album_image_associations (
    image_id INTEGER NOT NULL, -- image is a part of:
    album_id INTEGER NOT NULL, -- this album

    CONSTRAINT fk_image_id_assoc
        FOREIGN KEY (image_id)
        REFERENCES images (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_album_id_assoc
        FOREIGN KEY (album_id)
        REFERENCES albums (id)
        ON DELETE CASCADE
) STRICT;

CREATE TABLE users (
    key TEXT PRIMARY KEY NOT NULL,
    username TEXT NOT NULL UNIQUE,
    display_name TEXT  NULL UNIQUE,
    bio TEXT NULL,
    avatar_key TEXT NULL,
    banner_key TEXT NULL,
    accent_color TEXT NULL,
    featured_album_key TEXT NULL,
    created_at INTEGER NOT NULL, -- unix ts

    -- private
    password_hash TEXT NOT NULL,
    private INTEGER NOT NULL DEFAULT 0,
    color_theme TEXT NULL,

    CONSTRAINT fk_avatar_key_assoc
        FOREIGN KEY (avatar_key)
        REFERENCES images (key),

    CONSTRAINT fk_banner_key_assoc
        FOREIGN KEY (banner_key)
        REFERENCES images (key),

    CONSTRAINT fk_featured_album_key_assoc
        FOREIGN KEY (featured_album_key)
        REFERENCES albums (key)
) STRICT;

CREATE TABLE auth_sessions (
    id INTEGER PRIMARY KEY NOT NULL,
    user_key TEXT NOT NULL,
    token TEXT NOT NULL,
    created_at INTEGER NOT NULL, -- unix ts

    CONSTRAINT fk_user_key_assoc
        FOREIGN KEY (user_key)
        REFERENCES users (key)
        ON DELETE CASCADE
) STRICT;

-- tags users that are in the album
CREATE TABLE user_album_associations (
    user_key TEXT NOT NULL, -- user is tagged in:
    album_id INTEGER NOT NULL, -- this album

    CONSTRAINT fk_user_key_assoc
        FOREIGN KEY (user_key)
        REFERENCES users (key)
        ON DELETE CASCADE,

    CONSTRAINT fk_album_id_assoc
        FOREIGN KEY (album_id)
        REFERENCES albums (id)
        ON DELETE CASCADE
) STRICT;
