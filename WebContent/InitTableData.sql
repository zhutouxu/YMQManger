use db_ymq;

insert into tb_admin(name,password) values("admin","");
insert into tb_ymqfield(fieldname,enable,uplimit) values('one','1','10'),
                                                       ('two','1','10'),
                                                       ('three','1','10'),
                                                       ('four','1','10');
insert into tb_activitytime(activity_type,begintime,endtime) values('1','17:30:00','18:30:00'),
                                                             ('1','18:30:00','19:30:00'),
                                                             ('1','19:30:00','20:30:00'),
                                                             ('1','20:30:00','21:30:00');