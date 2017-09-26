package com.rd.rdtracker.ejb;

import java.util.List;

import javax.ejb.Local;

import com.rd.rdtracker.beans.PersonBean;

@Local
public interface Refresh {

	public Integer getRandomValue();

	public List<PersonBean> getRefreshInfo();
}
