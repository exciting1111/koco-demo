# KOCO KOC 表单 - Google Sheets 接入指南

## 总共只需 5 步，约 10 分钟完成

---

## 第一步：创建 Google 表格

1. 打开 [Google Sheets](https://sheets.google.com)
2. 点击 **"空白"** 创建新表格
3. 将表格命名为 **「KOCO KOC 申请」**
4. 在第一行（A1 到 J1）依次填入以下表头：

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 | J1 |
|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Platform | ProfileLink | Followers | Category | Reason | Language |

> 注意：表头名称必须与上面完全一致（区分大小写），因为代码会按这些名称匹配字段。

---

## 第二步：创建 Apps Script

1. 在 Google 表格中，点击菜单 **扩展程序 → Apps Script**
2. 会打开一个新的脚本编辑器页面
3. **删除**编辑器中默认的所有代码
4. 复制粘贴以下代码：

```javascript
var sheetName = 'Sheet1';
var scriptProp = PropertiesService.getScriptProperties();

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost (e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      return header === 'Timestamp' ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
```

5. 点击 **保存**（Ctrl+S）

---

## 第三步：运行初始化

1. 在脚本编辑器顶部的函数下拉菜单中，选择 **`intialSetup`**
2. 点击 **运行** 按钮（▶）
3. 第一次运行会弹出权限请求：
   - 点击 **「审查权限」**
   - 选择你的 Google 账号
   - 如果出现 "此应用未经验证" 提示，点击 **「高级」→「前往 xxx（不安全）」**
   - 点击 **「允许」**
4. 等待运行完成（底部显示 "执行完毕"）

---

## 第四步：部署为 Web 应用

1. 点击右上角 **「部署」→「新建部署」**
2. 点击左侧齿轮图标 ⚙，选择 **「Web 应用」**
3. 设置：
   - **说明**：KOC Form Handler
   - **执行身份**：选择 **「我自己」**
   - **谁有权访问**：选择 **「任何人」**
4. 点击 **「部署」**
5. 复制生成的 **Web 应用网址**（类似 `https://script.google.com/macros/s/AKfycb.../exec`）

> 这个 URL 非常重要，下一步需要用到！

---

## 第五步：配置网站

打开 `script.js` 文件，找到这一行（大约在第 2295 行）：

```javascript
var GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL';
```

将 `YOUR_GOOGLE_SHEETS_WEB_APP_URL` 替换为你在第四步复制的 URL，例如：

```javascript
var GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxxxxxxxxx/exec';
```

保存文件并推送到 GitHub，完成！

---

## 验证

1. 打开网站，点击 **「Đăng ký KOC ngay →」** 按钮
2. 填写表单并提交
3. 打开 Google 表格，刷新页面
4. 你应该能看到新增的一行数据，包含时间戳和所有表单字段

---

## 常见问题

**Q: 表格中没有数据？**
A: 检查表头名称是否完全匹配（区分大小写），确认 Apps Script 已正确部署。

**Q: 修改了脚本怎么办？**
A: 每次修改脚本后需要重新部署：「部署」→「管理部署」→ 编辑 → 版本选「新版本」→「部署」。

**Q: 可以添加更多字段吗？**
A: 可以。在表格第一行添加新表头，在 script.js 的 formData.append 中添加对应字段即可。
