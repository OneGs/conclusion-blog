git pull origin master

yarn build

sudo rm -rf /var/www/175.178.221.4/html/*

sduo mv docs/.vuepress/dist/* /var/www/175.178.221.4/html

echo "deploy complete success"
