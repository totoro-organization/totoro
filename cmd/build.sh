echo "run project version 0.1"
req="docker-compose up"

while test $# -gt 0
do
    index=$(echo $1 | cut -f1 -d=)
    val=$(echo $1 | cut -f2 -d=)
    case "$index" in
        --build-local) req+=" db phpmyadmin api"
            ;;
        --projects) 
            req="docker-compose up db phpmyadmin api"
            IFS=";" read -a images <<< "$val"
            for i in "${images[@]}"
            do
                req+=" $i"
            done
            ;;
        *)  echo "parameters error use \"sh build.sh --build-local --projects='first_image;second_images...'\"";
            exit 1;
            ;;
    esac
    shift
done

eval "$req" | awk '{for (i=1;i<=NF;i++) if (!a[$i]++) printf("%s%s",$i,FS)}{printf("\n")}'