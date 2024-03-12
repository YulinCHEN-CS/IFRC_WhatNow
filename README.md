# Tasks
`npm run dev`
1. 修改 delete society功能
   + 删除society后，需要把数据库里所有表的society_id对应的数据都删除
   + 对于User来说，更新society_id为null
2. 增加apiUser
   + apiUser包括user重复变量，更新apiUser是否需要更新User
   + 是创建一个apiUser后，自动生成一个api然后同时更新api数据库是吗
   + api是否就是数据库里的uuid
   + superroute: apiUser更新名字或者organization_type, industry_type, location?

# Bug list
+ contentController, ContentService
  + Catch error - send BAD_GATEWAY instead of BAD_REQUEST
+ SocietyService
  + Create Society - check existance (no id provided)
+ 