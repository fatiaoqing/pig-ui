<!--
  -    Copyright (c) 2018-2025, lengleng All rights reserved.
  -
  - Redistribution and use in source and binary forms, with or without
  - modification, are permitted provided that the following conditions are met:
  -
  - Redistributions of source code must retain the above copyright notice,
  - this list of conditions and the following disclaimer.
  - Redistributions in binary form must reproduce the above copyright
  - notice, this list of conditions and the following disclaimer in the
  - documentation and/or other materials provided with the distribution.
  - Neither the name of the pig4cloud.com developer nor the names of its
  - contributors may be used to endorse or promote products derived from
  - this software without specific prior written permission.
  - Author: lengleng (wangiegie@gmail.com)
  -->

<template>
    <basic-container>
      <avue-crud ref="crud"
                 :page.sync="page"
                 :search.sync="search"
                 :data="tableData"
                 :table-loading="tableLoading"
                 :option="tableOption"
                 :permission="permissionList"
                 @on-load="getList"
                 @row-del="rowDel"
                 @search-change="searchChange"
                 @search-reset="searchReset"
                 @refresh-change="refreshChange"
                 @size-change="sizeChange"
                 @current-change="currentChange"
                 @row-update="handleUpdate"
                 @row-save="handleSave"
                 >
        <template slot-scope="{disabled,size}" slot="keyWordSearch">
          <el-input v-bind:placeholder="searchtext" :disabled="disabled" :size="size" style="width:200px" v-model="search.keyWord"></el-input>
        </template>
      </avue-crud>
    </basic-container>
</template>

<script>
  import {fetchList, delObj, addObj, putObj} from '@/api/admin/products/datapoint'
  import {tableOption} from '@/const/crud/admin/products/datapoint'
  import {mapGetters} from 'vuex'

  export default {
    name: 'datapoint',
    data() {
      return {
        search:{},//自定义搜索栏
        searchtext: this.$i18n.t('iot.datapoint.search'),//搜索栏默认提示语
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20 // 每页显示多少条
        },
        keyWord: '',//搜索栏数据
        tableLoading: false,
        tableOption: tableOption
      }
    },
    computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permissions.product_datapoint_add, false),
          delBtn: this.vaildData(this.permissions.product_datapoint_del, false),
          editBtn: this.vaildData(this.permissions.product_datapoint_edit, false)
        }
      }
    },
    methods: {
      getList(page, params) {
        this.tableLoading = true
        fetchList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params), this.keyWord).then(response => {
          this.tableData = response.data.data.records
          this.page.total = response.data.data.total
          this.tableLoading = false
        })
      },
      //删除特定行
      rowDel: function (row, index) {
        this.$confirm(this.$i18n.t('iot.datapoint.del.warning') + row.dpFlag, this.$i18n.t('iot.datapoint.del.title'), {
          confirmButtonText: this.$i18n.t('iot.datapoint.del.yes'),
          cancelButtonText: this.$i18n.t('iot.datapoint.del.cancel'),
          type: 'warning'
        }).then(function () {
          return delObj(row.id)
        }).then(data => {
          this.getList(this.page)
          this.$message.success(this.$i18n.t('iot.datapoint.del.success'))
        }).catch(() =>{
          this.$message.error(this.$i18n.t('iot.datapoint.del.error'))
        })
      },
      //搜索栏点击按钮
      searchChange(params, done) {
        done()
        this.keyWord=this.search.keyWord
        this.page.currentPage=1
        this.getList(this.page)
      },
      //搜索栏清空
      searchReset() {
        this.keyWord=''
        this.page.currentPage=1
        this.getList(this.page)
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize
      },
      currentChange(current) {
        this.page.currentPage = current
      },
      refreshChange() {
        this.getList(this.page)
      },
      //修改
      handleUpdate: function (row, index, done) {
        putObj(row, row.id).then(() => {
          this.$message.success(this.$i18n.t('iot.datapoint.update.success'))
          this.getList(this.page)
          done()
        }).catch(() =>{
          this.$message.error(this.$i18n.t('iot.datapoint.update.error'))
        })
      },
      //新增
      handleSave: function (row, done) {
        addObj(row).then(() => {
          this.$message.success(this.$i18n.t('iot.datapoint.add.success'))
          this.getList(this.page)
          done()
        }).catch(() =>{
          this.$message.error(this.$i18n.t('iot.datapoint.add.error'))
        })
      }
    }
  }
</script>
