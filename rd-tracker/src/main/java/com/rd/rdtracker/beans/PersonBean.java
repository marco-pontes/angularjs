package com.rd.rdtracker.beans;

import java.io.Serializable;

import javax.enterprise.context.SessionScoped;
import javax.inject.Named;

@Named
@SessionScoped
public class PersonBean implements Serializable{
	private static final long serialVersionUID = 1L;
	private String name;
	
	public PersonBean(){
		this.name = "Nome 1";
	}
	
	public PersonBean(String name) {
		this.name = name;
	}

	public String getName(){
		return this.name + this.hashCode();
	}

	public void setName(String name) {
		this.name = name;
	}
}
