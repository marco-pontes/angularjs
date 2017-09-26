package com.rd.rdtracker.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.SessionCookieConfig;
import javax.servlet.annotation.HttpConstraint;
import javax.servlet.annotation.ServletSecurity;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(urlPatterns="/login", initParams={@WebInitParam(name="type", value="checking")})
public class LogoutServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		ServletContext servletContext = request.getServletContext();
//		SessionCookieConfig config = servletContext.getSessionCookieConfig();
//		config.setHttpOnly(true);
		response.getWriter().print("<html> <body>"
				+ "<form method=\"POST\" action=\"j_security_check\">"
				+ "<input type=\"text\" name=\"j_username\">"
				+ "<input type=\"password\" name=\"j_password\" autocomplete=\"off\">"
				+ "<input type=\"submit\" value=\"submit\">"
				+ "</body></html>");
//		HttpSession session = request.getSession(true);
//		session.setAttribute("jsession", "asasas");
//		servletContext.getRequestDispatcher("/certification").forward(request, response);
	}
	

}
