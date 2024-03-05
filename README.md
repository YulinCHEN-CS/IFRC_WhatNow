# Tasks
`npm run dev`
1. Society增删改查（/add_society.. * 4）
2. Get audit log, delete audit log
3. Auth 用nsAdmin
4. appjs第一次跑注释掉的内容初始化数据库
5. .env 更改成本地数据库配置
6. 算法实现在service里
7. Controller调service
   + 调用多个： ContentController.deletContent()
8. 放在一个文件夹里， 名为SA...
9.  error handleing - util.responseHandler
   Status code:
   + success:
     + httpStatus.OK - get/delete
     + httpStatus.CREATED - create/update
   + fail: 
     + httpStatus.BAD_GATEWAY - 所有不明原因
     + httpStatus.BAD_REQUEST - 明白原因

# Bug list
+ contentController, ContentService
  + Catch error - send BAD_GATEWAY instead of BAD_REQUEST
+ SocietyService
  + Create Society - check existance (no id provided)
+ 