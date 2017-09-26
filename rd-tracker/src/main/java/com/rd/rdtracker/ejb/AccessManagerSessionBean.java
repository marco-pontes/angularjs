package com.rd.rdtracker.ejb;

import javax.ejb.Singleton;

@Singleton
public class AccessManagerSessionBean{
	Integer accessCount;
	public Integer getRandomValue(){
		return (int)(Math.random() * 100);
	}
	
}
