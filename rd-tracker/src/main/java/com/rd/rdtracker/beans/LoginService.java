package com.rd.rdtracker.beans;

import java.util.logging.Logger;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ejb.Stateless;
import javax.faces.event.AjaxBehaviorEvent;


@Named
@Stateless
public class LoginService{
	public static final Logger LOGGER = Logger.getLogger(LoginService.class.getName());
	@Inject
	private UserBean userBean;
	public void doLogin(){
		if(userBean.getUser().getLogin().equals("admin") && userBean.getUser().getPassword().equals("password")){
			LOGGER.info("Login Succesfull");
			userBean.setResult("success");
		} else {
			userBean.setResult("failed");
		}
	}
	
}
