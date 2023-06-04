### 系统部署上线

####后端
* 云服务器  安装 MySql、JDK、Redis、nginx
* 配置项目数据库地址，Maven package命令打包，上传jar包到云服务器
* 转储sql文件，上传数据库文件到云服务器执行
* 执行 java -jar internship.jar

####前端
* umi build
* 上传dist文件到云服务器
* 配置nginx代理，启动ngix服务器
