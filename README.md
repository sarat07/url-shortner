# url-shortner


1. Clone the repository by running the below command:
git clone https://github.com/sarat07/url-shortner.git ./workspace
2. Execute permissions for start.sh script by running the below command:
chmod +x start.sh
3. run the start script by running the below command:
./start.sh

This will start both the front end and back end apps and it should open the app automatically at localhost:3000. 

The following are the tech stack:
Frontend - React, Typescript, Html and CSS.
Backend - Express(Node), Typescript, Mangoose and Mongo DB.

Requirement Checklist:
Build a web page with a form for entering a URL- When the form is submitted - DONE
return a shortened version of the URL - DONE
Save a record of the shortened URL to a database - DONE
Ensure the slug of the URL (abc123 in the screenshot above) is unique - DONE
When the shortened URL is accessed, redirect to the stored URL - DONE
If an invalid slug is accessed, display a 404 Not Found page - DONE

- Suggested Tech- React w/ typescript for the front end- Node.JS w/ typescript for the backend- Docker
-
- Extra Credit-
- Add support for accounts so people can view the URLs they created - I couldnt do the user account based urls display instead chose to do display all the created urls.
- Validate the URL provided is an actual URL - DONE
-  Display an error message if invalid- DONE
- Make it easy to copy the shortened URL to the clipboard - DONE
- Allow users to modify the slug of their URL- NOT DONE
- Track visits to the shortened URL- DONE
- Add rate-limiting to prevent bad-actors from spamming the service-DONE
- Update API to follow a known spec (such as json:api) - DONE, used json.

- On top of it, i provided the ability to delete the url and handled error and success messages gracefully for all scenarios.

I tried to set this up on docker but ran into some issues with Vite and didnt want to delay the submission further. 
