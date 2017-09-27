## RD-Tracking

The project is divided between two types of apps:
Client examples to test the tracker tool and the tracker tool itself.


### Client Examples:
There are two client examples using the rd-tracking.js library and these examples are constructed in different ways, with distinct technologies.
Both of those clients include the rd-tracking.js library by using a javascript call to insertBefore in the document, so the library inclusion(in case it was on a CDN) doesn't slow down the client's page load.

#### Normal page client(client)

This is a very basic html set of pages for simple navigation, to show the rd-tracking.js library when there is a full reload of the pages.
Each page navigation calls the tracker js lib, which can send the tracking information to the rd-tracker if needed(or store the navigation locally). The rd-tracking.js lib is included using javascript inside the application.js file.

##### To run this app: 

In the root folder run:

npm install

npm start

#### To test the RD tracking library run:

npm test

#### SPA page client(client-spa)

This is an angular 4.2.4 application written in typescript to show how the rd-tracking.js library would be used in a Single Page Application.
The library is almost the same, but it doesn't call the tracking for itself. 

The tracking is called inside the angular router navigation events(app.component.ts#35). It uses gulp as the build tool and some other libraries to package the compiled typescript and other files.


##### To run this app(tested on windows with node 6.11.3): 

In the root folder run:

npm install

npm remove @types/es6-promise

npm start 


###### Where to put UIDs for tracking:
client: document.clientId variable inside application.js

client-spa: document.clientId variable inside index.html

### The Tracker Tool(rd-tracker):

The tracker tool is a backend application written in java, using Java EE 7 libraries for JSON, persistence, and transaction support.
It has an AngularJS(1.6.6) frontend to comunicate with the backend server, and it displays the current client's applications being tracked.

The rd-tracker tool makes it possible to add sites to be tracked by giving an user interface to setup clients' applications/sites.
Each new application is given an unique ID that customers use to identify their application/site within rd-tracker and then send tracking information.

For a client's site to be tracked inside the rd-tracker tool, it needs to include the rd-tracking.js library within its code.
Currently there is an instance of the tracking tool running in aws: **http://52.67.19.151:8080/**
##### To run this app: 
Run:

mvn package

go into src/main/webapp and run:

npm install

install it into a java EE container(tested with wildfly 10.1)

### The Tracker Library(rd-tracking.js)
rd-tracker.js is the javascript library that will send page views to the rd-tracker backend app. It basically saves tracked pages in the sessionStorage when there is no e-mail saved in the session(email informed by the contact form). 

After the email is informed, the tracker javascript sends all pages to the rd-tracker backend and clears the sessionStorage page cache. After that each page view is tracked in real time, each request is sent to the backend rd-tracker for tracking.

The library uses only vannila javascript so that no extra library is needed when the clients want to incorporate it in their sites.
