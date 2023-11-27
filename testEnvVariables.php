<?php
    require_once __DIR__ . '/vendor/autoload.php';
    
    use Dotenv\Dotenv;

    if (file_exists(__DIR__ . '/.env')) {
        echo "The .env file exists.\n";
    } else {
        echo "The .env file does not exist.\n";
    }
    
    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    $oracleUsername = $_ENV['ORACLE_USERNAME'];
    $oraclePassword = $_ENV['ORACLE_PASSWORD'];
    
    echo $oracleUsername;
    echo "\n";
    echo $oraclePassword;
?>