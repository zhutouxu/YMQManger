package com.hundsun.xuxp10575.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.SimpleExpression;

public class hibernateQuery<T> 
{
	//ȡ��session
	private Session session = null;
	private SessionFactory factory = null;
	private Configuration cfg =  null;
	
	public hibernateQuery() 
	{
		// TODO �Զ���ɵĹ��캯����
		//��ȡhibernate.cfg.xml�ļ�
		cfg = new Configuration().configure();
		//����SessionFactory
		factory = cfg.buildSessionFactory(
			      new StandardServiceRegistryBuilder().applySettings(cfg.getProperties()).build());	
	}	
	
	public List<T> DoQuery(List<SimpleExpression> filters,T tmp)
	{
		session = factory.openSession();
		Criteria criteria = session.createCriteria(tmp.getClass());		
		if(filters != null)
		{
			for(Criterion filter : filters)
			{
				criteria.add(filter);
			}
		}
		List<T> list = criteria.list();
		session.close();
		return list;
	}
	
	public List<T> DoQuery(String Hql)
	{
		session = factory.openSession();
		Query query = session.createQuery(Hql);
		List<T> list = query.list();
		session.close();
		return list;
	}
	
	public boolean DoAdd(T object)
	{	
		boolean result = true;
		//����session
		session = factory.openSession();
		try{		
			//��������
			session.beginTransaction();
			//����User����
			session.save(object);
			//�ύ����
			session.getTransaction().commit();

		}catch(Exception e){
			e.printStackTrace();
			//�ع�����
			session.getTransaction().rollback();
			result = false;
		}
		finally
		{
			if(session != null)
			{
				if(session.isOpen())
				{
					//�ر�session
					session.close();
				}
			}
		}
		return result;
	}
	
	public boolean DoBatchAdd(List<T> objlist)
	{
		boolean result = true;
		//����session
		session = factory.openSession();
		try{		
			//��������
			session.beginTransaction();
			for(int i=0;i<objlist.size();i++)
			{
				session.save(objlist.get(i));
				if(i % 20 == 0 && i != 0)
				{
					//�ύ����
					session.getTransaction().commit();
					session.clear();	
					session.beginTransaction();
				}
			}
			session.getTransaction().commit();
		}catch(Exception e){
			e.printStackTrace();
			//�ع�����
			session.getTransaction().rollback();
			result = false;
		}
		finally
		{
			if(session != null)
			{
				if(session.isOpen())
				{
					//�ر�session
					session.close();
				}
			}
		}
		return result;		
	}
	public boolean DoDelete(T object)
	{
		boolean result = true;
		//����session
		session = factory.openSession();
		try{		
			//��������
			session.beginTransaction();
			//����User����
			session.delete(object);
			//�ύ����
			session.getTransaction().commit();

		}catch(Exception e){
			e.printStackTrace();
			//�ع�����
			session.getTransaction().rollback();
			result = false;
		}
		finally
		{
			if(session != null)
			{
				if(session.isOpen())
				{
					//�ر�session
					session.close();
				}
			}
		}
		return result;
	}
	
	public boolean DoUpdate(T object)
	{
		boolean result = true;
		//����session
		session = factory.openSession();
		try{		
			//��������
			session.beginTransaction();
			//����User����
			session.update(object);
			//�ύ����
			session.getTransaction().commit();

		}catch(Exception e){
			e.printStackTrace();
			//�ع�����
			session.getTransaction().rollback();
			result = false;
		}
		finally
		{
			if(session != null)
			{
				if(session.isOpen())
				{
					//�ر�session
					session.close();
				}
			}
		}
		return result;
	}
	
	public boolean DoBatchUpdate(List<T> objlist)
	{
		boolean result = true;
		//����session
		session = factory.openSession();
		try{		
			//��������
			session.beginTransaction();
			for(int i=0;i<objlist.size();i++)
			{
				session.update(objlist.get(i));
				if(i % 20 == 0 && i != 0)
				{
					//�ύ����
					session.getTransaction().commit();
					session.clear();	
					session.beginTransaction();
				}
			}
			session.getTransaction().commit();
		}catch(Exception e){
			e.printStackTrace();
			//�ع�����
			session.getTransaction().rollback();
			result = false;
		}
		finally
		{
			if(session != null)
			{
				if(session.isOpen())
				{
					//�ر�session
					session.close();
				}
			}
		}
		return result;		
	}	
}
