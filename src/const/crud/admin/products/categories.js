/**
 * @author zhouxingchao
 * @date 2021/7/12 9:54
 */


import i18n from '@/lang';


const home = '';
export var tableOption = {
  border: true,
  align: 'center',
  selection: true,
  searchSpan: 10,
  searchMenuSpan: 8,
  stripe: true,
  searchSize: 'mini',
  editBtn: true,
  addBtn: true,
  delBtn: true,
  dialogDrag: true,//表单拖拽
  defaultSort: {   //默认排序字段
    prop: 'sort',
    order: 'ascending'
  },
  column: [{
    label: i18n.t("iot.categories.id"),
    prop: 'id',
    addDisplay: false,
    editDisplay: false,
    value: '',
  },
    {
      label: i18n.t("iot.categories.nameCn"),
      prop: 'nameCn',
      value: '',
      rules: [{
        required: true,
        message: i18n.t("iot.categories.message") + i18n.t("iot.categories.nameCn"),
        trigger: 'blur'
      }],
    },
    {
      label: i18n.t("iot.categories.nameEn"),
      prop: 'nameEn',
      value: '',
      rules: [{
        required: true,
        message: i18n.t("iot.categories.message") + i18n.t("iot.categories.nameEn"),
        trigger: 'blur'
      }],
    },
    {
      label: i18n.t("iot.categories.nameTw"),
      prop: 'nameTw',
      value: '',
      rules: [{
        required: true,
        message: i18n.t("iot.categories.message") + i18n.t("iot.categories.nameTw"),
        trigger: 'blur'
      }],
    },
    {
      hide: true,
      label: i18n.t("iot.categories.parent"),
      prop: 'parentId',
      type: 'tree',
      dicUrl: '/products/categories/tree',
      dicMethod: 'get',
      dicFlag: true,   //自动更新字典,可network查看
      props: {
        children: 'children',
        label: 'nameCn',
        value: 'id'
      },
      rules: [{
        required: true,
        message: i18n.t("iot.categories.message") + i18n.t("iot.categories.parentId"),
        trigger: 'blur'
      }],
    },
    {
      label: i18n.t("iot.categories.iconUrl"),
      prop: 'iconUrl',
      type: 'upload',
      listType: 'picture-img',
      propsHttp: {
        home: home,
        res: 'data',
        url: 'path',
      },
      canvasOption: {
        text: 'avue',
        ratio: 0.1    //显示压缩比例
      },
      action: "/products/categories/upload",
    },
    {
      label: i18n.t("iot.categories.sort"),
      prop: 'sort',
      type: 'number',
      sortable: true,
      maxRows: 999,
      minRows: 1,
    },
    {
      hide: true,
      label: i18n.t("iot.categories.name"),
      prop: 'name',
      search: true,
      searchslot: true,
      addDisplay: false,
      editDisplay: false,
      display: false
    }
  ]
}

export var treeOption = {
  border: true,
  stripe: true,
  align: 'center',
  menuAlign: 'center',
  editBtn: true,
  addBtn: true,
  delBtn: true,
  dialogDrag: true,   //表单拖拽
  defaultSort: {
    prop: 'sort',
    order: 'ascending'
  },
  column: [{
    label: i18n.t("iot.categories.id"),
    prop: 'id',
    addDisplay: false,
    editDisplay: false,
    sortable: true,
  },
    {
      label: i18n.t("iot.categories.nameCn"),
      prop: 'nameCn',
      rules: [{
        required: true,
        message: i18n.t("iot.categories.message") + i18n.t("iot.categories.nameCn"),
        trigger: 'blur'
      }],
    },
    {
      label: i18n.t("iot.categories.nameEn"),
      prop: 'nameEn',
      rules: [{
        required: true,
        message: i18n.t("iot.categories.message") + i18n.t("iot.categories.nameEn"),
        trigger: 'blur'
      }],
    },
    {
      label: i18n.t("iot.categories.nameTw"),
      prop: 'nameTw',
      rules: [{
        required: true,
        message: i18n.t("iot.categories.message") + i18n.t("iot.categories.nameTw"),
        trigger: 'blur'
      }],
    },
    {
      hide: true,
      label: i18n.t("iot.categories.parent"),
      prop: 'parentId',
      type: 'tree',
      dicUrl: '/products/categories/tree',
      dicMethod: 'get',
      dicFlag: true,  //自动更新字典,可network查看
      props: {
        children: 'children',
        label: 'nameCn',
        value: 'id'     //选中的值
      },
      rules: [{
        required: true,
        message: i18n.t("iot.categories.message") + i18n.t("iot.categories.parentId"),
        trigger: 'blur'
      }],
    },
    {
      label: i18n.t("iot.categories.iconUrl"),
      prop: 'iconUrl',
      type: 'upload',
      listType: 'picture-img',
      propsHttp: {
        home: home,
        res: 'data',
        url: 'path',
      },
      canvasOption: {
        text: 'avue',
        ratio: 0.1
      },
      action: "/products/categories/upload",
    },
    {
      label: i18n.t("iot.categories.sort"),
      prop: 'sort',
      type: 'number',
      sortable: true,
      maxRows: 999,
      minRows: 1,
    }
  ]
}


