package com.hundsun.xuxp10575.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.SimpleExpression;

public class BaseDao<T>
{
	//ȡ��session
	private SessionFactory factory = null;
	public void setFactory(SessionFactory factory) {
		this.factory = factory;
	}

	//private Configuration cfg =  null;
	
	public BaseDao() 
	{
		// TODO �Զ���ɵĹ��캯����
		//��ȡhibernate.cfg.xml�ļ�
		/**cfg = new Configuration().configure();
		//����SessionFactory
		factory = cfg.buildSessionFactory(
			      new StandardServiceRegistryBuilder().applySettings(cfg.getProperties()).build());	*/
	}	
	
	public List<T> DoQuery(List<SimpleExpression> filters,T tmp)
	{
		Session session = factory.getCurrentSession();
		Criteria criteria = session.createCriteria(tmp.getClass());		
		if(filters != null)
		{
			for(Criterion filter : filters)
			{
				criteria.add(filter);
			}
		}
		List<T> list = criteria.list();
		return list;
	}
	
	public List<T> DoQuery(String Hql)
	{
		Session session = factory.getCurrentSession();
		Query query = session.createQuery(Hql);
		List<T> list = query.list();
		return list;
	}
	
	public boolean DoAdd(T object)
	{	
		boolean result = true;
		//����session
		Session session = factory.getCurrentSession();
		try{		
			session.save(object);
		}catch(Exception e){
			result = false;
		}
		return result;
	}
	
	public boolean DoBatchAdd(List<T> objlist)
	{
		boolean result = true;
		//����session
		Session session = factory.getCurrentSession();
		for(int i=0;i<objlist.size();i++)
		{
			session.save(objlist.get(i));
		}
		return result;		
	}
	public boolean DoDelete(T object)
	{
		boolean result = true;
		//����session
		Session session = factory.getCurrentSession();
		try{		
			session.delete(object);
		}catch(Exception e){
			result = false;
		}
		return result;
	}
	
	public boolean DoUpdate(T object)
	{
		boolean result = true;
		//����session
		Session session = factory.getCurrentSession();
		try{		
			session.update(object);
		}catch(Exception e){
			result = false;
		}
		return result;
	}
	
	public boolean DoBatchUpdate(List<T> objlist)
	{
		boolean result = true;
		//����session
		Session session = factory.getCurrentSession();
		for(int i=0;i<objlist.size();i++)
		{
			session.update(objlist.get(i));
		}
		return result;			
	}	
}
