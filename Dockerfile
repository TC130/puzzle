# 使用nginx:alpine作为基础镜像
FROM nginx:alpine

# 安装git
RUN apk add --no-cache git

# 从GitHub仓库克隆代码
RUN git clone https://github.com/TC130/puzzle.git /usr/share/nginx/html

# 创建nginx配置文件
RUN echo 'server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态文件缓存配置
    location ~* \\.(jpg|jpeg|png|gif|css|js|ico)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }

    # 禁用服务器版本号
    server_tokens off;

    # 限制请求体大小
    client_max_body_size 10M;
}' > /etc/nginx/conf.d/default.conf

# 暴露80端口
EXPOSE 80

# 启动nginx服务
CMD ["nginx", "-g", "daemon off;"]
