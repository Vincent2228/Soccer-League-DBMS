<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 'On');
    // Create connection to Oracle
    $conn = oci_connect('s44hossa', 'ecbDep123!',
    '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=oracle.scs.ryerson.ca)(Port=1521))(CONNECT_DATA=(SID=orcl)))');
    if (!$conn) {
        $m = oci_error();
        echo "shit aint work";
    }
    else{
        echo "successfully connected with oracle database";
    }
?>