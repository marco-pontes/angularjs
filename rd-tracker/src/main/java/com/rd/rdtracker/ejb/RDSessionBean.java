package com.rd.rdtracker.ejb;

import javax.ejb.Stateless;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Named
@Stateless
public class RDSessionBean {
    @PersistenceContext
    EntityManager em;

    public <T> T update(final T object) {
        em.merge(object);
        return object;
    }

    public <T> T save(final T object) {
        em.persist(object);
        return object;
    }
}
