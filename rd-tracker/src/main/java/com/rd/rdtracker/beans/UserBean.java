package com.rd.rdtracker.beans;


import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import com.rd.rdtracker.entities.User;

@Named
@RequestScoped
public class UserBean{
	private User user;
	private String result;
	
	public UserBean() {
		this.user = new User();
	}
	
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}
	
}
