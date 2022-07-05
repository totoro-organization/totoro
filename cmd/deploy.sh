app="$1"
commit_message="$2"

branch_name=$(git symbolic-ref -q HEAD)
branch_name=${branch_name##refs/heads/}
branch_name=${branch_name:-HEAD}

cd ./$app
rm -rf node_modules
rm package-lock.json
git add .
git commit -m "$commit_message"
git remote add $app-heroku https://git.heroku.com/$app-totoro.git
heroku login
cd ..
git subtree push --prefix=$app $app-heroku $branch_name:main
heroku ps:scale web=1
heroku open