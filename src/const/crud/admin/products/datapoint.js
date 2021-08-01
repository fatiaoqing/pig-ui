
const DIC = {
  datakind: [{
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
  }]
}
import i18n from '@/lang'
export const tableOption = {
  border: true,
  menuAlign: 'center',
  align: 'center',
  refreshBtn: true,
  searchMenuSpan: 6,
  searchSize: 'mini',
  column: [{
    label: i18n.t("iot.datapoint.id"),
    prop: 'id',
    hide: true,
    editDisplay: false,
    addDisplay: false
  }, {
    label: i18n.t("iot.datapoint.nameCn"),
    prop: 'nameCn',
    rules: [{
      required: true,
      message: i18n.t("iot.datapoint.message")+i18n.t("iot.datapoint.nameCn"),
      trigger: 'blur'
    }]
  }, {
    label: i18n.t("iot.datapoint.nameTw"),
    prop: 'nameTw',
    rules: [{
      required: true,
      message: i18n.t("iot.datapoint.message")+i18n.t("iot.datapoint.nameTw"),
      trigger: 'blur'
    }]
  }, {
    label: i18n.t("iot.datapoint.nameEn"),
    prop: 'nameEn',
    rules: [{
      required: true,
      message: i18n.t("iot.datapoint.message")+i18n.t("iot.datapoint.nameEn"),
      trigger: 'blur'
    }]
  }, {
    label: i18n.t("iot.datapoint.dpFlag"),
    prop: 'dpFlag',
    rules: [{
      required: true,
      message: i18n.t("iot.datapoint.message")+i18n.t("iot.datapoint.dpFlag"),
      trigger: 'blur'
    }]
  }, {
    label: i18n.t("iot.datapoint.dataType"),
    prop: 'dataType',
    type: 'select',
    dicData: DIC.datakind,
    rules: [{
      required: true,
      message: i18n.t("iot.datapoint.message")+i18n.t("iot.datapoint.dataType"),
      trigger: 'blur'
    }]
  },{
    label: i18n.t("iot.datapoint.units"),
    prop: 'units',
    hide: true,
    rules: [{
      required: false,
      message: i18n.t("iot.datapoint.message")+i18n.t("iot.datapoint.units"),
      trigger: 'blur'
    }]
  },{
    label: i18n.t("iot.datapoint.note"),
    prop: 'note',
    hide: true,
    rules: [{
      required: false,
      message: i18n.t("iot.datapoint.message")+i18n.t("iot.datapoint.note"),
      trigger: 'blur'
    }]
  },{
    label: i18n.t("iot.datapoint.keyWord"),
    prop: 'keyWord',
    hide: true,
    search:true,
    searchslot: true,
    editDisplay: false,
    addDisplay: false,
    searchTip:i18n.t("iot.datapoint.message")+i18n.t("iot.datapoint.keyWord"),
    showColumn:false
  }]
}
