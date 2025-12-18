# 使用nginx:alpine作为基础镜像
FROM nginx:alpine

# 安装git
RUN apk add --no-cache git

# 从GitHub仓库克隆代码
RUN git clone https://github.com/TC130/puzzle.git /usr/share/nginx/html

# 切换到代码目录
WORKDIR /usr/share/nginx/html

# 复制配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露80端口
EXPOSE 80

# 启动nginx服务
CMD ["nginx", "-g", "daemon off;"]
