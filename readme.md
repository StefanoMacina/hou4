Requirements for Running in Local Network using apache2:

 1) Copy src/environments/environment.ts, rename it to environment.prod.ts, and set baseUrl to your localhost "http://192.168.x.x/api/products".
    	
 2) run
		 bash deployToApache.sh
This bash script will:
- Install all dependencies,
- Build the project (set your server IP and port in environment.ts),
- Copy all files in the www folder to the Android folder and create the APK,
- Delete all content in the /var/www/html/ folder,
- Copy the APK into the /var/www/html/ folder of Apache2.

3) go to server/src/main/resources
-  set profile to dev o prod in application-yml
-  set your production configuration in application-prod.yml
			    
4) run 
    docker compose up -d 

to create  postgres db and backend image and run containers 
or
run backend using 
    mvn clean install 
 and execute jar using 
    java -jar target/...
	
To install the app on your Android device, visit 192.168.x.x/app-debug.apk after 
    deployToApache.sh

To test outside the local network with ngrok	

 1) go to ngrok and create a token
 2) set up your token and ngrok endpoint in baseUrl in environment.prod.ts 	
 3) expose your local server using "ngrok http yourhost"            	
