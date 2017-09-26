package com.rd.rdtracker.beans;

import java.util.logging.Logger;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ejb.Stateless;
import javax.faces.event.ActionEvent;
import javax.faces.event.AjaxBehaviorEvent;


@Named
@Stateless
public class AjaxLoginService{
	public static final Logger LOGGER = Logger.getLogger(AjaxLoginService.class.getName());
	@Inject
	private UserBean userBean;
	public void doLogin(ActionEvent evt){
		if(userBean.getUser().getLogin().equals("admin") && userBean.getUser().getPassword().equals("password")){
			LOGGER.info("AjaxLogin Succesfull");
			userBean.setResult("AjaxSuccess");
		} else {
			userBean.setResult("AjaxFailed");
		}
	}
	
}
