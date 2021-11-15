echo -e "create table testing(FirstName varchar(50), LastName varchar(250), Age int(3));" | sqlite3 testing.db
echo -e "
    insert into testing values ('John', 'Doe', 32);
    insert into testing values ('Jane', 'Doe', 29);
    insert into testing values ('Bill', 'Joe', 35);
    insert into testing values ('Martha', 'Grand', 28);
" | sqlite3 testing.db
echo -e "select * from testing order by random();" | sqlite3 testing.db