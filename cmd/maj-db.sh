for command in 'DROP DATABASE database_development;' 'CREATE DATABASE database_development;'
do 
    docker exec -it $(docker ps | grep db | awk '{print $1}') mysql -u root --password=root -c $command
done
docker-compose down
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)
docker rmi $(docker images -a -q)
rm -rf database/
docker-compose up db phpmyadmin api