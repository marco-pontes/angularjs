package com.rd.rdtracker.rest;

import java.util.List;

import com.rd.rdtracker.ejb.UserSessionBean;
import com.rd.rdtracker.entities.User;

import javax.ejb.EJB;
import javax.servlet.annotation.HttpConstraint;
import javax.servlet.annotation.ServletSecurity;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@Path("users")
public class UserResource {
	@EJB UserSessionBean userSessionBean;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> getAll(@QueryParam("page") int page, @QueryParam("pageSize") int pageSize){
		List<User> users = userSessionBean.findAll();
//		int start = page * pageSize;
//		int end = (page + 1) * pageSize;
//		users = users.subList(start, end0?);
		return users;
	}
	
	@GET
	@Path("{userId}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getUser(@PathParam("userId") long userId){
		User user = new User();
		user.setLogin("gotById" + userId);
		return user;
	}
	
	@POST
	@Path("create")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User create(User user){
		userSessionBean.create(user);
		return user;
	}
}
