import Mock from "mockjs";
// 引入模板函数类
import record from "./permission";

Mock.setup({
  timeout: 800 // 设置延迟响应，模拟向后端请求数据
});

// Mock.mock( url, post/get , 返回的数据)；

Mock.mock("/api/getHostRouters", "get", record.productHostRouters);
