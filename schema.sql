create table if not exists artists(
    identity integer primary key,
    branch integer not null references artistBranches,
    timestamp integer not null,
    name text not null
) strict;

create table if not exists albums(
    identity integer primary key,
    branch integer not null references albumBranches,
    timestamp integer not null,
    title text not null,
    date integer not null
) strict;

create table if not exists songs(
    identity integer primary key,
    branch integer not null references songBranches,
    timestamp integer not null,
    title text not null
) strict;

create table if not exists segments(
    identity integer primary key,
    song integer not null references songs,
    type integer not null,
    end integer not null
) strict;

create table if not exists artistBranches(
    identity integer primary key,
    head integer references artists
) strict;

create table if not exists albumBranches(
    identity integer primary key,
    head integer references albums
) strict;

create table if not exists songBranches(
    identity integer primary key,
    head integer references songs
) strict;

create table if not exists artistAlbums(
    artist integer references artists,
    albumBranch integer references albumBranches
) strict;

create table if not exists albumSongs(
    album integer references albums,
    songBranch integer references songBranch,
    place integer
) strict;

create table if not exists songArtists(
    song integer references songs,
    artistBranch integer references artistBranches
) strict;
