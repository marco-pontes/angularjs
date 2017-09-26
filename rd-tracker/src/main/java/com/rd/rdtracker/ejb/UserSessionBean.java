package com.rd.rdtracker.ejb;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.ejb.Stateless;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import com.rd.rdtracker.entities.Profile;
import com.rd.rdtracker.entities.User;

@Named
@Stateless
public class UserSessionBean {
	@PersistenceContext
	EntityManager em;
	
	public List<User> findAll(){
		List<User> users = new ArrayList<User>();
		Query query = em.createQuery("select u from User u");
		users = query.getResultList();
		return users;
	}

	public void create(User user) {
		ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
		Validator validator = factory.getValidator();
		Profile profile = new Profile();
		profile.setName("R1");
		List<Profile> a = new ArrayList<Profile>();
		a.add(profile);
		user.setProfiles(a);
		em.persist(profile);
		Set<ConstraintViolation<User>> constraintViolations = validator.validate(user);
		em.persist(user);
	}
}
