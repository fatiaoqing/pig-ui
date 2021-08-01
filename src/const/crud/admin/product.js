/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */

const DIC = {
  datakind1: [{
    label: 'null',
    value: 0
  }, {
    label: 'string',
    value: 1
  }, {
    label: 'number',
    value: 2
  }, {
    label: 'bool',
    value: 3
  }, {
    label: 'enum',
    value: 4
  }, {
    label: 'raw',
    value: 5
  }]
}

export const tableOption = {
  searchMenuSpan: 6,
  excelBtn: 'true',
  selection: 'true',
  menuAlign: 'center',
  align: 'center',
  headerAlign: 'center',
  border: true,
  stripe: true,
  addBtn: true,
  labelWidth: 110,
  column: [{
    label: 'id',
    prop: 'id',
    hide: true,
    editDisplay: false,
    addDisplay: false
  }, {
    label: '产品id',
    prop: 'productId',
    rules: [{
      required: true,
      message: "产品id不能为空",
      trigger: "blur"
    }],
    editDisplay: false,
    addDisplay: true
  }, {
    label: '简体中文',
    prop: 'nameCn',
    type: 'input',
  }, {
    label: '英文',
    prop: 'nameEn',
    type: 'input',
  }, {
    label: '繁体',
    prop: 'nameTw',
    type: 'input',
  }, {
    label: '产品分类',
    prop: 'categoryId',
    // value: ,
    type: 'tree',
    dicUrl: '/admin/products/categories/tree', //字典地址
    dicMethod: "get",
    filter: true, //支持过滤搜索
    props: {     //   一级下拉框
      //字典参数
      label: "nameCn",
      value: "id",
    },
    children: {   //二级下拉框
      label: "nameCn",
      value: "id",
    }
  }, {
    label: '通信类型',
    prop: 'commType',
    type: 'select',
    dicData: DIC.datakind1, //传入静态字典
  }, {
    label: '功率',
    prop: 'power',
    type: 'input',
  }, {
    label: '备注',
    prop: 'notes',
    type: 'input',
  }, {
    label: '搜索',
    prop: 'keyword', //搜索框字段
    left: 0,
    search: true,
    hide: true,
    editDisplay: false,
    addDisplay: false
  }]
}
export const pointTableOption = {
  addBtn: false,    //新增按钮
  delBtn: true, //行删除
  refreshBtn: false,  //刷新
  columnBtn: false, //列显影
  align: 'center',  //表格列齐方式
  column: [{
    label: '功能点中文',
    prop: 'nameCn',
    type: 'text',
  }, {
    label: '功能点英文',
    prop: 'nameEn',
    type: 'text',
  },{
    label: '功能点繁体',
    prop: 'nameTw',
    type: 'text',
  },{
    label: '类型',
    prop: 'dataType',
    type: 'text',
  },{
    label: '数据传输类型',
    prop: 'dateTmType',
    type: 'text',
  },
  ]
}
export const pointChoiceOption = {

}
