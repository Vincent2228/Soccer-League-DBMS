To run:
1. Have npm and node installed

2. Run `npm install` to download all the dependencies

3. 
	i. Install an Oracle Instant Client. This is the client-side software that the `oracledb` node dependency talks to in order to establish connections with our remote db. Installations found here: https://www.oracle.com/database/technologies/instant-client/downloads.html
	ii. Make sure it's a version which would be compatible with Oracle 11g or 12c. You could probably just download any Instant Client version 12.1.x.x or above.
	iii. Un-zip and extract the folder in your PC's C drive or equivalent. Add this directory to your machine's PATH (ex: C:\instantclient_21_12) and create a new variable `LD_LIBRARY_PATH` that points to that same directory (ex: C:\instantclient_21_12); for safety, create a new variable `OCI_LIB64` that points to the same dir).

4. Create a `.env` file and store your oracle username and passwords
	i. ORACLE_USERNAME=your_usrname		// quotes (' ') not needed
	ii. ORACLE_PASSWORD=your_password	// quotes (' ') not needed

5. Connect to our school's VPN.

6. run `node testConnection.js` to test