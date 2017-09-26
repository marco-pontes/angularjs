package com.rd.rdtracker.ejb;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import com.rd.rdtracker.entities.Application;

@Named
@Stateless
public class ApplicationSessionBean extends RDSessionBean {
	@PersistenceContext
	EntityManager em;
	
    public List<Application> findAll() {
        List<Application> applications = new ArrayList<Application>();
        final Query query = em.createQuery("select app from Application app");
        applications = query.getResultList();
        return applications;
	}

    public void create(final Application application) {
		final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
		final Validator validator = factory.getValidator();
        final Set<ConstraintViolation<Application>> constraintViolations = validator.validate(application);
        final String hashCode = UUID.randomUUID().toString();
        application.setHashCode(hashCode);
		em.persist(application);
	}

    public Application findByUID(final String appId) {
        final Query query = em.createQuery("select app from Application app where hashCode = :appId");
        query.setParameter("appId", appId);
        Application application = null;
        final Boolean appExists = countByUID(appId) > 0;
        if (appExists) {
            application = (Application) query.getSingleResult();
        }
        return application;
    }

    public Application findById(final Long id) {
        final Query query = em.createQuery("select app from Application app where id = :id");
        query.setParameter("id", id);
        Application application = null;
        application = (Application) query.getSingleResult();
        return application;
    }

    public Long countByUID(final String appId) {
        final Query query = em.createQuery("select count(app) from Application app where hashCode = :appId");
        query.setParameter("appId", appId);
        final Long count = (Long) query.getSingleResult();
        return count;
    }
}
