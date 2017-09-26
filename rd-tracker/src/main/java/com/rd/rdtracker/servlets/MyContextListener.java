package com.rd.rdtracker.servlets;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class MyContextListener implements ServletContextListener {
	public static final Logger LOGGER = Logger
			.getLogger(MyContextListener.class.getName());

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		ServletContext context = sce.getServletContext();
		Properties prop = new Properties();
		InputStream in = getClass().getClassLoader().getResourceAsStream("../application.properties");
		try {
			prop.load(in);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		}
		try {
			in.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		LOGGER.info("\n");
		LOGGER.info(String.format("===== Environment set to %s =====", prop.get("application.environment")));
		LOGGER.info("\n");
		
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
	}
}
