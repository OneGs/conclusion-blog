# git pull origin master

yarn build

rm -rf /var/www/blog/*

mv docs/.vuepress/dist/* /var/www/blog

echo "deploy complete success"
