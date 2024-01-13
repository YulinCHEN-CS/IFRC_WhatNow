const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(express.json());

// MySQL连接配置
const dbConfig = {
  host: '',
  user: '',
  password: '',
  database: '',
};


// API路由，用于记录用户修改记录
app.post('/api/log', async (req, res) => {
  try {
    const logEntry = req.body;

    // 将修改记录插入到数据库中
    const result = await insertLogEntry(logEntry);

    res.json({ success: true, message: 'Log entry successfully recorded.', result });
  } catch (error) {
    res.status(500).send('Internal Server Error');
    console.error('Error:', error.message);
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// 插入修改记录到数据库
async function insertLogEntry(logEntry) {
  return new Promise((resolve, reject) => {
    pool.execute(
        'INSERT INTO user_logs (username, action, description) VALUES (?, ?, ?)',
        [logEntry.username, logEntry.action, logEntry.description],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
    );
  });
}