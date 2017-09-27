package com.rd.rdtracker.ejb;

import java.util.Date;
import java.util.Set;

import javax.ejb.Stateless;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import com.rd.rdtracker.entities.PageView;
import com.rd.rdtracker.entities.User;

@Named
@Stateless
public class PageViewSessionBean extends RDSessionBean {
	@PersistenceContext
	EntityManager em;
	
    public PageView create(final String name, final Date time, final User user) {
        final PageView pageView = new PageView();
        pageView.setUrl(name);
        pageView.setTime(time);
		final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
		final Validator validator = factory.getValidator();
        final Set<ConstraintViolation<PageView>> constraintViolations = validator.validate(pageView);
        em.persist(pageView);
        return pageView;
	}

}
