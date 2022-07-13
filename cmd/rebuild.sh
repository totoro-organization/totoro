req="docker-compose up"

for image in $(docker ps --format '{{.Names}}')
do
    IFS="_" read -a service <<< "$image"
    req+=" ${service[1]}"
done

docker-compose down
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)
docker rmi $(docker images -a -q)
rm -rf database/
eval $req