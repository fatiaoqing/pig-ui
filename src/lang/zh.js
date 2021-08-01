
export default {
  common: {
    lang: "语言",
    zh: "中文",
    tw: "繁體",
    en: "English",
    select: "选择",
    edit: "编辑",
    delete: "删除",
    enable: "启用",
    disable: "禁用",
    search: "搜索",
  },
  dict: {
      manager: "字典项管理"
  },
  appuser: {
      username: "用户名",
      nickname: "昵称",
      email: "邮箱",
      phone: "手机号",
      newPwd: "新密码",
      oldPwd: "旧密码",
      confirmPwd: "确认新密码",
      uppwd: "修改密码",
      email_formatter_error: "请输入正确的邮箱",
      phone_formatter_error: "请输入正确的电话"
  },
  datapoint:{
    id:"功能点id",
    nameCn:"功能点中文",
    nameTw:"功能点繁体",
    nameEn:"功能点英文",
    dpFlag:"标识符",
    dataType:"功能点类型",
    units:"功能点数据单位",
    note:"功能点备注",
    keyWord:"关键词",
    message:"请输入",
    search:"进行模糊搜索",
    del:{
      warning:"是否确认删除 ",
      title:"警告",
      yes:"确认",
      cancel:"取消",
      success:"删除成功",
      error:"删除失败"
    },
    update:{
      success:"修改成功",
      error:"修改失败,请检查标识符是否已存在"
    },
    add:{
      success:"添加成功",
      error:"添加失败,请检查标识符是否已存在"
    }
  },
  product:{
    id:"产品主键id",
    productId:"产品id",
    iconUrl:"图标",
    nameCn:"产品中文名称",
    nameEn:"产品英文名称",
    nameTw:"产品繁体名称",
    categoryId:"产品分类",
    commType:"通信类型",
    power:"功率",
    notes:"备注",
    text:"关键词",
    loadText:'附件上传中，请稍等',
    tip:'只能上传jpg/png文件，且不超过500kb',
    message1:'请输入内容',
    message2:'批量导入',
    del:{
      warning:"是否确认删除产品ID为 ",
      message3:"的产品？",
      title:"警告",
      yes:"确认",
      cancel:"取消",
      success:"删除成功",
      error:"删除失败"
    },
    update:{
      success:"修改成功",
      error:"修改失败，请检查您的输入是否符合规范！"
    },
    add:{
      success:"添加成功",
      error:"添加失败,当前产品id已存在！"
    }
  }
}
