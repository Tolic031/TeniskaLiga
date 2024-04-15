use master;
go
drop database if exists teniska_liga;
go
create database teniska_liga collate Croatian_CI_AS;
go
use teniska_liga;

create table sezone(
id int not null primary key identity(1,1),
pocetak_sezone datetime not null,
kraj_sezone datetime not null,
cijena decimal (18,2)not null,
);

create table mecevi(
id int not null primary key identity(1,1),
izazivac  int not null,
izazvani int not null,
datum datetime not null,
red  char(10) not null,
napomena text,
sezona int,
pobjednik int
);

create table natjecatelji(
id int not null primary key identity(1,1),
ime varchar(50) not null,
prezime varchar (50) not null,
broj_telefona varchar(50),
email varchar(50),
clan bit not null,
);

alter table mecevi add foreign key (sezona) references sezone(id);
alter table mecevi add foreign key (pobjednik) references natjecatelji(id);
alter table mecevi add foreign key (izazivac) references natjecatelji(id);
alter table mecevi add foreign key (izazvani) references natjecatelji(id);

insert into sezone (pocetak_sezone,kraj_sezone,cijena)
values ('2024-04-01 08:00:00', '2024-11-15 23:59:59', 100)

insert into natjecatelji (ime, prezime, clan)
values
('Valent','Brkić', 1),
('Tomislav','Kušević', 2),
('Ljudevit','Sukić', 2),
('Ivan','Salamon', 1),
('Antun','Marošević', 2),
('Ivan','Tolić', 1),
('Dajana','Tolić', 1),
('Sara','Matijević', 2),
('Tomislav','Wilhelm', 1),
('Jadranko','Grubišić', 1);

insert into mecevi (izazivac, izazvani, datum, red, pobjednik)
values 
(1,2,'2024-04-01 15:00:00', '5', null),
(3,4,'2024-04-01 16:30:00', '4', null),
(5,6,'2024-04-01 18:00:00', '3', 5),
(7,8,'2024-04-01 19:30:00', '2', null),
(9,10,'2024-04-01 21:00:00', '1', 10);

