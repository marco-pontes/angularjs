package com.rd.rdtracker.ejb;

import java.util.List;

import javax.ejb.Stateful;

@Stateful
public class UserInfoSessionBean {
	private List<String> pagesVisited;
	private Integer refreshCount;
	
	public void addPageVisited(String pageVisited) {
		pagesVisited.add(pageVisited);
	}
	
	public List<String> getPagesVisited() {
		return pagesVisited;
	}

	public void setPagesVisited(List<String> pagesVisited) {
		this.pagesVisited = pagesVisited;
	}

	public Integer getRefreshCount() {
		return refreshCount;
	}

	public void setRefreshCount(Integer refreshCount) {
		this.refreshCount = refreshCount;
	}
	public void addRefreshCount() {
		this.refreshCount += this.refreshCount;
	}
}
