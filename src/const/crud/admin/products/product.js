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
  },{
    label: 'number',
    value: 2
  },{
    label: 'bool',
    value: 3
  },{
    label: 'enum',
    value: 4
  },{
    label: 'raw',
    value: 5
  }],
  datakind2: [{

  }]
}

import i18n from '@/lang'

const home = '';

export var tableOption = {
  searchMenuSpan:6,
  excelBtn: 'true',
  selection: 'true',
  menuAlign:'center',
  align: 'center',
  headerAlign: 'center',
  border: true,
  stripe: true,
  addBtn: true,
  labelWidth: 110,
  column:[{
    label: i18n.t("iot.product.id"),
    prop: 'id',
    hide: true,
    editDisplay: false,
    addDisplay: false
  },{
    label: i18n.t("iot.product.productId"),
    prop: 'productId',
    editDisplay: true,
    addDisplay: true
  },
    {
      label: i18n.t("iot.product.iconUrl"),
      prop: 'iconUrl',
      type: 'upload',
      listType: 'picture-img',
      propsHttp: {
        home: home,   //路径前缀
        res: 'data',
        url: 'path',
      },
      canvasOption: { //图片回显
        text: 'avue',
        ratio: 0.1    //显示压缩比例
      },
      action: "/products/upload",
    },
    {
    label: i18n.t("iot.product.nameCn"),
    prop: 'nameCn',
    type: 'input',
  }, {
    label: i18n.t("iot.product.nameEn"),
    prop: 'nameEn',
    type: 'input',
  }, {
    label: i18n.t("iot.product.nameTw"),
    prop: 'nameTw',
    type: 'input',
  }, {
    label: i18n.t("iot.product.categoryId"),
    prop: 'categoryId',
    type: 'tree',
      dicUrl:'/products/categories/tree',
      dicMethod: "get",
      filter:true, //过滤搜索
      props: {     //一级下拉框
        label: "nameCn",
        value: "id",
      },
      children:{   //二级下拉框
        label: "nameCn",
        value: "id",
      }
  },{
    label: i18n.t("iot.product.commType"),
    prop: 'commType',
    type: 'select',
      dicData: DIC.datakind1,
  },{
    label: i18n.t("iot.product.power"),
    prop: 'power',
    type: 'input',
  },{
    label: i18n.t("iot.product.notes"),
    prop: 'notes',
    type: 'input',
  },{
      label:i18n.t("iot.product.text"),
      prop:'keyword', //搜索框字段
      left: 0,
      search: true,
      hide: true,
      editDisplay: false,
      addDisplay: false
    }]
}
export const pointTableOption = {
  addBtn: false,    //新增按钮
  editBtn: false, //行内编辑按钮
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
  },{
    label: '扩展类型中文',
    prop: 'develop',
    type: 'text',
  },{
    label: '扩展类型英文',
    prop: 'develop',
    type: 'text',
  },{
    label: '扩展类型繁体',
    prop: 'develop',
    type: 'text',
  },
  ]
}
