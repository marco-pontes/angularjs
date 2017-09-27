package com.rd.rdtracker.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.rd.rdtracker.ejb.ApplicationSessionBean;
import com.rd.rdtracker.ejb.PageViewSessionBean;
import com.rd.rdtracker.ejb.UserSessionBean;
import com.rd.rdtracker.entities.Application;
import com.rd.rdtracker.entities.PageView;
import com.rd.rdtracker.entities.User;

@Path("tracking")
public class TrackingResource {
    @EJB
    ApplicationSessionBean applicationSessionBean;
    @EJB
    UserSessionBean userSessionBean;
    @EJB
    PageViewSessionBean pageViewSessionBean;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
    public List<Application> getAll() {
        final List<Application> applications = applicationSessionBean.findAll();
        return applications;
	}
	
	@GET
	@Path("{appId}")
	@Produces(MediaType.APPLICATION_JSON)
    public Application getApplication(@PathParam("appId") final String appId) {
        final Application application = applicationSessionBean.findByUID(appId);
        return application;
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
    public Boolean track(@QueryParam("appId") final String appId, @QueryParam("email") final String email, final List<String> views) {
        final Application application = applicationSessionBean.findByUID(appId);
        if (application != null) {
            User user = userSessionBean.findByEmail(email);
            if (user == null) {
                user = new User();
                user.setEmail(email);
                user.setApplication(application);
                userSessionBean.save(user);
                application.getUsers().add(user);
                applicationSessionBean.update(application);
            }
            final List<PageView> pageViews = new ArrayList<PageView>();
            for (final String view : views) {
                final String[] values = view.split(";");
                final Date date = new Date(Long.parseLong(values[1]));
                final String url = values[0];
                final PageView pageView = pageViewSessionBean.create(url, date, user);
                pageViews.add(pageView);
            }
            user.addPageViews(pageViews);
            userSessionBean.update(user); 

        } else {
            throw new IllegalArgumentException("The application is not registered for tracking");
        }
        return true;
	}

}
