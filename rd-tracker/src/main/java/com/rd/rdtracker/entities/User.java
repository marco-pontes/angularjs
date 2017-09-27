package com.rd.rdtracker.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Min;

@Entity
public class User {
	public User() {
	}
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String name;
	private Integer age;
	@Min(3)
	private String login;
	private String email;
	@Min(6)
	private String password;
	
    @ElementCollection(fetch = FetchType.EAGER)
	private List<PageView> pageViews = new ArrayList<PageView>();
	
	public String getLogin() {
		return login;
	}
	public void setLogin(final String login) {
		this.login = login;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(final String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(final String name) {
		this.name = name;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(final Integer age) {
		this.age = age;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(final String email) {
		this.email = email;
	}

	public Long getId() {
		return id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public List<PageView> getPageViews() {
		return pageViews;
	}
	public void setPageViews(final List<PageView> profiles) {
		this.pageViews = profiles;
	}
	public void addPageViews(final List<PageView> pageViews) {
		this.pageViews.addAll(pageViews);
	}
}
