# nodejs
私人文档托管


#### nginx配置
```nginx
server {
        listen 80;
        listen [::]:80;

        server_name node.jm47.com;

        root /data/web/nodejs/nodejs.org/build/zh-cn;
        index index.html;

        location /static/ {
                root /data/web/nodejs/nodejs.org/build;
        }

        location /layouts/ {
                root /data/web/nodejs/nodejs.org/build;
        }

        location /zh-cn/ {
                root /data/web/nodejs/nodejs.org/build;
        }

}

```