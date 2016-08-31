package com.hundsun.xuxp10575.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Set;

import com.hundsun.xuxp10575.beans.ActivityTime;
import com.hundsun.xuxp10575.beans.YMQApply;
import com.hundsun.xuxp10575.beans.YMQAssignResult;
import com.hundsun.xuxp10575.beans.YMQField;
import com.hundsun.xuxp10575.dao.hibernateQuery;
import com.hundsun.xuxp10575.constant.ApplyStatus;
import com.hundsun.xuxp10575.constant.SignStatus;

public class YMQAssignSvr implements IAssignSvr
{
	private hibernateQuery<YMQApply> hQuery1 = new hibernateQuery<YMQApply>();
	private hibernateQuery<YMQField> hQuery2 =  new hibernateQuery<YMQField>();
	private hibernateQuery<ActivityTime> hQuery3 = new hibernateQuery<ActivityTime>();
	private hibernateQuery<YMQAssignResult> hQuery4 = new hibernateQuery<YMQAssignResult>();
	
	public boolean SignIn(YMQAssignResult assignResult)
	{
		return hQuery4.DoUpdate(assignResult);
	}
	public void Assign() 
	{
		int Vipfieldnum = 0, Ordfieldnum = 0, Assignnum = 0;
		int vipfielduplimit = 0,ordfielduplimit = 0;
		List<YMQApply> viplists,ordlists;
		Set<YMQApply> applysets;
		String hql = null;
		if(CheckBefore() == false)
			return;
		hql = "from YMQField y where y.enable = '1' order by y.fieldno";
		List<YMQField> fieldlists = hQuery2.DoQuery(hql);
		hql = "from ActivityTime a";
		List<ActivityTime> times = hQuery3.DoQuery(hql);
		for (int i = 0; i < times.size(); i++) {
			applysets = times.get(i).getYmqapply();
			viplists = new ArrayList<YMQApply>();			
			ordlists = new ArrayList<YMQApply>();
			for(YMQApply apply : applysets)
			{
				if(apply.getVipflag() == '1' && apply.getApplystatus().equals(ApplyStatus.APPLYSUBMIT))
					viplists.add(apply);
				else
				if(apply.getVipflag() == '0' && apply.getApplystatus().equals(ApplyStatus.APPLYSUBMIT))
					ordlists.add(apply);
			}			
			if (viplists.size() >= 10) {
				Vipfieldnum = 2;
			} else {
				Vipfieldnum = 1;
			}
			Ordfieldnum = fieldlists.size() - Vipfieldnum;
			for(int j=0;j<Vipfieldnum;j++)
			{
				vipfielduplimit += fieldlists.get(j).getUplimit();
			}
			for(int k=Vipfieldnum;k<Vipfieldnum+Ordfieldnum;k++)
			{
				ordfielduplimit += fieldlists.get(k).getUplimit();
			}
			Assignnum = viplists.size() > vipfielduplimit ? vipfielduplimit : viplists.size();
			List<Integer> vipassignindexlists = lottery(viplists.size(), Assignnum);
			this.RecordAssignResult(viplists,vipassignindexlists,fieldlists.subList(0, Vipfieldnum));
			this.UpdateApplyStatus(viplists, vipassignindexlists);

			Assignnum = ordlists.size() > ordfielduplimit ? ordfielduplimit : ordlists.size();
			List<Integer> ordassignindexlists = lottery(ordlists.size(), Assignnum);
			this.RecordAssignResult(ordlists, ordassignindexlists,fieldlists.subList(Vipfieldnum, fieldlists.size()));
			this.UpdateApplyStatus(ordlists, ordassignindexlists);
		}
	}
	
	private boolean CheckBefore()
	{
		QryManager qryManager = new QryManager();
		if(qryManager.QryAssignResult(null).size() > 0)
			return false;
		else
			return true;
	}

	private List<Integer> lottery(int totalnum, int resultnum) {
		List<Integer> resultlist = new ArrayList<Integer>(resultnum);
		int total[] = new int[totalnum];
		for (int i = 0; i < totalnum; i++)
			total[i] = 0;
		Random random = new Random();
		for (int i = 0; i < resultnum; i++) {
			int k = random.nextInt(totalnum);
			while (total[k] == 1) {
				k = (k + 1) % (totalnum);
			}
			total[k] = 1;
			resultlist.add(k);
		}
		return resultlist;
	}
	
	private void RecordAssignResult(List<YMQApply> totalapply,List<Integer> assignindexlist,List<YMQField> fields)
	{
		int assignindex = 0;
		List<YMQAssignResult> assignResults = new ArrayList<YMQAssignResult>();
		for(YMQField field : fields)
		{
			for(int i =0;i < field.getUplimit() && assignResults.size() < assignindexlist.size();i++)
			{
				YMQAssignResult result = new YMQAssignResult();
				result.setEmployno(totalapply.get(assignindexlist.get(assignindex).intValue()).getEmployno());
				result.setActivitytime(totalapply.get(assignindexlist.get(assignindex).intValue()).getActivitytime());
				result.setFieldno(field.getFieldno());
				result.setSignstatus(SignStatus.SIGNNO);
				assignResults.add(result);
				assignindex++;
			}
		}
		hQuery4.DoBatchAdd(assignResults);
	}
	
	private void UpdateApplyStatus(List<YMQApply> totalapply,List<Integer> assignindexlist)
	{
		for(int i = 0;i < totalapply.size(); i++)
		{
			totalapply.get(i).setApplystatus(ApplyStatus.APPLYFAIL);
		}
		for(int i = 0;i < assignindexlist.size();i++)
		{
			totalapply.get(assignindexlist.get(i).intValue()).setApplystatus(ApplyStatus.APPLYSUCCESS);
		}
		hQuery1.DoBatchUpdate(totalapply);
	}
}
