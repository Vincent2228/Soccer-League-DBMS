<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Soccer League DBMS</title>
    <link rel="stylesheet" href="SoccerLeague.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
</head>

<main>
    <body style="background-image: url(pxfuel.jpg); color: white;">
        <h1 style = "text-align: center;"> Soccer League Database Management System</h1>
        <h2 style="text-align: center;"> By: Vincent Bercze, Kelvin Gu, Safwan Hossain</h2>


        <?php
        $username = 'your_username';
        $password = 'your_password';
        $connection_string = 'your_connection_string';
        
        $conn = oci_connect($username, $password, $connection_string);
        if (!$conn) {
            $e = oci_error();
            trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
            exit;
        }
        
        $query = 'SELECT stadium_name, team_name, wins, losses
                    FROM large_stadium, home_to, team
                    WHERE large_stadium.stadium_id = home_to.stadium_id AND home_to.team_id = team.team_id
                    ORDER BY stadium_name ASC;';
                    
        $stid = oci_parse($conn, $query);
        if (!$stid) {
            $e = oci_error($conn);
            trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
            exit;
        }
        
        oci_execute($stid);
        
        $rows = array();
        while ($row = oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_NULLS)) {
            $rows[] = $row;
        }
        
        echo "<table border='1'>\n";
        foreach ($rows as $row) {
            echo "<tr>\n";
            foreach ($row as $item) {
                echo "    <td>" . ($item !== null ? htmlentities($item, ENT_QUOTES) : "&nbsp;") . "</td>\n";
            }
            echo "</tr>\n";
        }
        echo "</table>\n";
        
        // Close the Oracle connection
        oci_close($conn);
        
        ?>
    </body>
</main>

