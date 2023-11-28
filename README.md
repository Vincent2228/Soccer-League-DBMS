To run:
1. Have npm and node installed

2. Run `npm install` to download all the dependencies. If this doesn't work, might be because server-side and client-side have different package.json configurations. So try:
    * cd into \server directory, then `npm install` (for all server-side dependencies)
    * cd into \client directory, and `npm install` again for client-side dependencies. this might take a while since it's a whole REACT project.

3. Communication between our Oracle Remote DB and oracledb dependency:
    * Install an Oracle Instant Client. This is the client-side software that the `oracledb` node dependency talks to in order to establish connections with our remote db. Installations found here: https://www.oracle.com/database/technologies/instant-client/downloads.html
    * Make sure it's a version which would be compatible with Oracle 11g or 12c. You could probably just download any Instant Client version 12.1.x.x or above.
    * Un-zip and extract the folder in your PC's C drive or equivalent. Add this directory to your machine's PATH (ex: C:\instantclient_21_12) and create a new variable `LD_LIBRARY_PATH` that points to that same directory (ex: C:\instantclient_21_12); for safety, create a new variable `OCI_LIB64` that points to the same dir.

4. Create a `.env` file and store your oracle username and passwords
    * ORACLE_USERNAME=your_usrname	// quotes (' ') not needed
    * ORACLE_PASSWORD=your_password	// quotes (' ') not needed

5. Connect to Ryerson SCS-Student VPN.

6. Make sure you populate your DB before running any of the front-end or back-end scripts

7. Verify the connection string corresponds to the Oracle DB version you used. In the current configuration in `server.js`, it is corresponding to oracle 12c. If you used 11g, change to: `dbConnectString = '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=oracle.scs.ryerson.ca)(Port=1521))(CONNECT_DATA=(SID=orcl1)))'`. But I recommend you use Oracle 12c.

8. Open two terminals:
    1. In the first terminal, go into \server dir, then run `npm run dev`. this should start 'nodemon', allowing the server to reset automatically when you make changes to `server.js`. The terminal should says "Server listening on port 5000".
    2. In the second terminal, go into \client dir and run `npm start`. this will launch the REACT deployment environment. keep the terminal running. might automatically open localhost:3000 in your default browser.

9. Open in browser:
    1. `http://localhost:5000/api` to see server-side (probably not much to see)
    2. `http://localhost:3000/` to see the REACT project if it hasn't auto-opened already. You can see either the current sample data rendered or go to browser console -> Network -> api (Name column) -> here you should see the data being fetched by client-side.

