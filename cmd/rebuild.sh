req="docker-compose up"

for image in $(docker ps -a -q)
do
    req+=" $image"
done

docker-compose down
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)
rm -rf database/
eval $req