echo "run project version 0.1";
docker-compose up && docker-compose exec api sequelize db:migrate;
