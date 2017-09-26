package com.rd.rdtracker.ejb;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Named;

import com.rd.rdtracker.beans.PersonBean;

@Stateless
public class RefreshSessionBean implements Refresh {
	
	public RefreshSessionBean(){}
	public Integer getRandomValue(){
		return (int)(Math.random() * 100);
	}
	
	public List<PersonBean> getRefreshInfo(){
		List<PersonBean> people = new ArrayList<PersonBean>();
		PersonBean person1 = new PersonBean("Nome 1");
		PersonBean person2 = new PersonBean("Nome 2");
		PersonBean person3 = new PersonBean("Nome 3");
		people.add(person1);
		people.add(person2);
		people.add(person3);
		
		return people;
	}
}
