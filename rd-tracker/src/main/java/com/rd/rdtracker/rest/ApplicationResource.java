package com.rd.rdtracker.rest;

import java.util.List;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.rd.rdtracker.ejb.ApplicationSessionBean;
import com.rd.rdtracker.entities.Application;

@Path("applications")
public class ApplicationResource {
	@EJB ApplicationSessionBean applicationSessionBean;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
    public List<Application> getAll() {
        final List<Application> applications = applicationSessionBean.findAll();
        return applications;
	}
	
	@GET
	@Path("{appId}")
	@Produces(MediaType.APPLICATION_JSON)
    public Application getApplication(@PathParam("appId") final Long id) {
        final Application application = applicationSessionBean.findById(id);
        return application;
	}
	
	@POST
	@Path("create")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
    public Application create(final Application application) {
		applicationSessionBean.create(application);
		return application;
	}
}
