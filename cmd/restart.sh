req="docker compose restart"

while test $# -gt 0
do
    case "$1" in
        *)  
            req+=" $1"
    esac
    shift
done
eval "$req" | awk '{for (i=1;i<=NF;i++) if (!a[$i]++) printf("%s%s",$i,FS)}{printf("\n")}'