
Have latest version of node installed 6.9
npm install typings -g (run as sudo if fails)
run npm install


npm install rd-tracker/src/main/webapp



		final PageView profile = new PageView();
		profile.setName("R1");
		final List<PageView> a = new ArrayList<PageView>();
		a.add(profile);
		application.setPageViews(a);
		em.persist(profile);