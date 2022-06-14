qp() {
    typeset msg="$1";
    shift;
    date;
    git pull;
    git add "$@";
    git commit -m "$msg";
    git push;
    date
}