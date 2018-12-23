if not exists(select 1 from sys.databases where name = 'MyChemicalRomance') create database MyChemicalRomance;

use MyChemicalRomance;

if not exists(select 1 from sys.tables where name = 'Item')
BEGIN
    create TABLE Item
    (
        Id INT not null IDENTITY(1,1) PRIMARY KEY,
        Name varchar(255) not null,
        DateEntered DATETIME not null DEFAULT(getdate())
    )
END