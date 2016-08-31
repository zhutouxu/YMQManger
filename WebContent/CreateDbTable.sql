drop table if exists tb_ymqfield;
drop table if exists tb_activitytime;
drop table if exists tb_activitydate;
drop table if exists tb_ymqapply;
drop table if exists tb_ymqassignresult;
drop table if exists tb_admin;
drop table if exists tb_vipuser;
create table tb_ymqfield
(
	fieldno int not null auto_increment,
	fieldname nvarchar(20) not null,
	enable char not null,
	uplimit int not null,
	primary key(fieldno)
);
create table tb_activitytime
(
	timeno int not null auto_increment,
	activity_type char not null,
	begintime time not null,
	endtime time not null,
	primary key(timeno)
);
create table tb_activitydate
(
	dateno int not null auto_increment,
	activity_type char not null,
	activity_date date not null,
	primary key(dateno)
);
create table tb_ymqapply
(
	applyno int not null auto_increment,
	applydate date not null,
	employno varchar(10) not null,
	timeno int not null,
	vipflag char not null,
	applystatus char not null,
	primary key(applyno),
	unique key(employno,timeno)
);
create table tb_ymqassignresult
(
	assignno int not null auto_increment,
	employno varchar(10) not null,
	fieldno int not null,
	timeno int not null,
	signstatus char not null,
	primary key(assignno)
);
create table tb_admin(
	id int not null auto_increment,
	name     nvarchar(20) not null,
	password varchar(32) not null,
	primary  key(id)
);

Create table tb_vipuser(
	id int not null auto_increment,
	employno varchar(10) not null,
	employname nvarchar(20) not null,
	startdate date not null,
	telephone varchar(11) not null,
	mail varchar(30) not null,
	department nvarchar(30),
	primary key(id),
	unique key(employno)
);