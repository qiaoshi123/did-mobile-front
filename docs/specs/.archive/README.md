# Spec 归档目录

## 目录用途

存放已完成执行的 Spec 文档，配合 `TIMELINE.md` 提供项目演进的时间线视图。

## 目录结构

```
.archive/
├── README.md            # 本文件
├── TIMELINE.md          # 时间线总表（核心）
├── register-spec.md     # 已归档的 Spec 文件
├── validate-rename-spec.md
└── ...
```

## 归档触发机制

- **自动归档**：`execute-proposal` Skill 执行完 Spec 所有任务后，自动将 Spec 文件移入此目录并更新时间线

## 归档流程

1. Spec 所有任务执行完毕，状态更新为 `✅ 已完成`
2. 将 `docs/specs/<name>-spec.md` 移动到 `docs/specs/.archive/<name>-spec.md`
3. 在 `TIMELINE.md` 表格末尾追加一条记录

## 注意事项

- 归档文件保持原样，不修改内容
- 时间线只追加，不修改已有记录
- 归档文件永久保留，不会被删除
- 需要回顾时，先看 `TIMELINE.md` 了解全局，再按需查看具体 Spec 文件
