package com.rd.rdtracker.ejb;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.rd.rdtracker.entities.User;

@Named
@Stateless
public class UserSessionBean extends RDSessionBean {
	@PersistenceContext
	EntityManager em;
	
    public List<User> findAll() {
        List<User> users = new ArrayList<User>();
        final Query query = em.createQuery("select u from User u");
        users = query.getResultList();
        return users;
	}

    public User findByEmail(final String email) {
        User user = null;
        if (countByEmail(email) > 0) {
            final Query query = em.createQuery("select u from User u where email = :email");
            query.setParameter("email", email);
            user = (User) query.getSingleResult();
        }
        return user;
    }

    public Long countByEmail(final String email) {
        final Query query = em.createQuery("select count(u) from User u where email = :email");
        query.setParameter("email", email);
        final Long count = (Long) query.getSingleResult();
        return count;
    }
}
