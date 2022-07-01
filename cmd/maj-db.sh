for command in 'DROP DATABASE database_development;' 'CREATE DATABASE database_development;'
do 
    docker exec -it $(docker ps | grep db | awk '{print $1}') mysql -u root --password=root -c $command
done
