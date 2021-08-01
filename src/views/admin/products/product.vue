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

<!--:option="pointChoiceOption"-->

<template>
  <div class="product">
    <basic-container>
      <!--主容器-->
      <el-container style="height: 500px; border: 0px solid #eee" >
        <!--左测容器-->
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <!--树结构-->
          <el-tree
            :data="treeData"
            :props="defaultProps"
            node-key="id"
            @node-click="getRelation">
          </el-tree>
        </el-aside>
        <!--内嵌主容器-->
        <el-container>
          <!--主体容器-->
          <el-main>
            <!--CRUD组件-->
            <avue-crud ref="crud"
                       :page.sync="page"
                       :data="tableData"
                       :table-loading="tableLoading"
                       :option="tableOption"
                       @on-load="getList"
                       @row-update="rowUpdate"
                       @row-save="rowSave"
                       @row-del="rowDel"
                       @search-change="searchChange"
                       @search-reset="searchReset"
                       @refresh-change="refreshChange"
                       @size-change="sizeChange"
                       @current-change="currentChange"
                       :upload-after="uploadAfter"
                       :upload-delete="uploadDelete">
              <!--自定义搜索框组件-->
              <template slot-scope="{row}" slot="keywordSearch">
                <el-input v-model="search.text" v-bind:placeholder="message1"clearable style="width: 125%">
                </el-input>
              </template>
              <!--批量导入组件-->
              <template slot="menuLeft" slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-upload2"
                  @click="handleImport(scope.row, scope.index)"
                >批量导入
                </el-button>
              </template>
              <!--功能按钮-->
              <template slot="menu" slot-scope="{row,index,type}">
                <el-button type="text" size="small" @click="pointBtn(row)">功能</el-button>
              </template>

            </avue-crud>

            <!--功能弹窗-->
            <el-dialog title="功能" :visible.sync="dialogVisibleOne" width="80%">
              <avue-crud
                ref="pointCrud"
                :data="pointTableData"
                :option="pointTableOption"
                :table-loading="pointTableLoading"
                @row-del="pointDel"
                @on-load="getPointList"
              >
                <!--功能表弹窗自定义组件（input-button）-->
                <template slot-scope="{row,index,type}" slot="menuLeft">
                  <span>产品ID</span>
                  <el-input v-bind:placeholder=pIdNum style="width: 30%">
                  </el-input>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;产品名称中文</span>
                  <el-input v-bind:placeholder=pNameCnText style="width: 20%">
                  </el-input>
                  <div></div>
                  <el-button type="primary" size="small" @click="pointBtnChoice">选择功能</el-button>
                </template>
              </avue-crud>

              <!--标识符弹窗-->
                <el-dialog title="选择属性" :visible.sync="dialogVisibleTwo" width="80%" :modal="false">

                  <el-header>
                    <template>
                      <!--标识符弹窗自定义input框-->
                      <el-input style="width: 30%" v-model=dpFlag v-bind:placeholder=message1></el-input>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <!--查询按钮-->
                      <el-button type="primary" size="small" @click="getDpFlagsByText" icon="el-icon-search">查询</el-button>
                    </template>
                  </el-header>

                  <el-main>
                    <!--标识符复选框-->
                    <el-checkbox-group v-model="checkedCities">
                      <el-row :gutter="20">
                        <el-col :span="6" v-for="(item, index) in dpFlags" >
                          <div class="grid-content bg-purple">
                            <el-checkbox :label="item.dpFlag" :key="item.dpFlag" @change="change">{{item.dpFlag}}
                            </el-checkbox>
                            <!--下拉框-->
                            <div>
                              <el-select v-model="flagOptionValue" placeholder="请选择" size="mini" v-if="isHide">
                                <el-option
                                  v-for="(item) in flagOption"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </el-checkbox-group>
                  </el-main>

                  <el-footer>
                    <div style="text-align: center">
                      <!--提交按钮-->
                      <el-button type="primary" size="small" @click="addFlags">提交</el-button>
                    </div>
                  </el-footer>

                </el-dialog>
            </el-dialog>

            <!--批量导入对话框-->
            <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
              <el-upload
                ref="upload"
                :limit="1"
                accept=".xlsx, .xls"
                :headers="upload.headers"
                :action="upload.url"
                :disabled="upload.isUploading"
                :on-progress="handleFileUploadProgress"
                :on-success="handleFileSuccess"
                :auto-upload="false"
                drag>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
              </el-upload>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFileForm">确 定</el-button>
                <el-button @click="upload.open = false">取 消</el-button>
              </div>
            </el-dialog>
          </el-main>
        </el-container>
      </el-container>
    </basic-container>
  </div>
</template>

<script>
  import {
    getProduct,
    delProduct,
    addProduct,
    putProduct,
    getTree,
    getHome,
    uploadDelete,
    getDpFlags,
    getProductRelation,
    addProductRelation,
    delProductRelation,
  } from '@/api/admin/products/product'
  import {tableOption} from '@/const/crud/admin/products/product'
  import {pointTableOption} from '@/const/crud/admin/products/product'
  import {pointChoiceOption} from '@/const/crud/admin/products/product'
  import {flagOption} from '@/const/crud/admin/products/product'
  import {mapGetters} from 'vuex'
  import Avue from '@smallwei/avue';
  import '@smallwei/avue/lib/index.css';
  import {craeteCommonHeaders} from "@/util/util.js";
  import {infoOption} from "../../../const/crud/admin/products/product";

  export default {
    data() {
      return {




        dialogVisibleOne: false,//控制功能弹窗显隐的变量
        pointTableData: [],//功能弹窗数据
        pointTableOption: pointTableOption,//功能弹窗表格
        pIdNum: "",     //产品ID
        pNameCnText: "",//产品名称中文
        pointTableLoading: false,//加载动画

        dialogVisibleTwo: false,//控制标识符弹窗显隐的变量
        dpFlag: "",//标识符
        dpFlags: [],//标识符弹窗数据
        checkedCities: [], //复选框已选中选项合集
        isHide: false, //控制标识符下拉框显隐变量
        flagOptionValue: '',  //下拉框选中值

        flagOption: [{
          value: '0',
          label: '上报'
        }, {
          value: '1',
          label: '下发'
        }, {
          value: '2',
          label: '可下发可上报'
        }],











        treeData: [],   //左测树结构数据
        defaultProps: {
          children: 'children',
          label: 'nameCn'
        },
        listQuery: {
          nameCn: undefined
        },
        message1:this.$i18n.t('iot.product.message1'),
        message2:this.$i18n.t('iot.product.message2'),
        excelBtn: true, //导出按钮
        addBtn: false,  //新增按钮
        menu: false,
        align: 'center',
        search: {},     //搜索框文本
        checked: true,
        tableData: [],  //右侧列表数据
        page: {
          total: 0,     //总页数
          currentPage: 1,// 当前页数
          pageSize: 20  //展示数据个数
        },
        categoryId: 0,
        text: '',       //查询列表数据的条件参数
        tableLoading: false,
        tableOption: tableOption,
        myfile: '',   //图片文件地址
        upload: {   //Excel文件
          open: false,
          title: "",
          isUploading: false,
          // headers: { Authorization: "Bearer " + store.getters.access_token },
          url: "/admin/products/excel",
          headers: {}
        },
      }
    },
    created(){
      //初始化树结构
      this.getTree();
      //获取图片路径前缀
      getHome().then(response=>{
        tableOption.column[2].propsHttp.home = response.data;
      })
    },
    computed: {
      ...mapGetters(["permissions"]),
    },
    methods: {

      /**
       * CRUD
       */

      //查询产品列表
      getList(page, params) {
        this.tableLoading = true
        getProduct(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params), this.categoryId, this.text).then(response => {
          this.tableData = response.data.data.records;
          this.page.total = response.data.data.total;
          this.tableLoading = false;
        })
      },
      //更新产品
      rowUpdate(row, index, done, tableLoading) {
        this.tableLoading = true
        if (this.myfile != '') {
          row.iconUrl = this.myfile;
          this.myfile = '';
        }
        putProduct(row).then(() => {
          this.$message.success(this.$i18n.t('iot.product.update.success'))
          done()
          this.getList(this.page);
        }).catch(() => {
          this.$message.error(this.$i18n.t('iot.product.update.error'));
        })
      },
      //新增产品
      rowSave(row, done, tableLoading) {
        row.iconUrl = this.myfile;
        this.myfile = '';
        this.tableLoading = true;
        addProduct(row).then(() => {
          this.$message.success(this.$i18n.t('iot.product.add.success'));
          done();
          this.getList(this.page);
        }).catch(() => {
          this.$message.error(this.$i18n.t('iot.product.add.error'));
        })
      },
      //删除产品
      rowDel: function (row, index) {
        this.$confirm(this.$i18n.t('iot.product.del.warning') + row.productId + this.$i18n.t('iot.product.del.message3'), this.$i18n.t('iot.product.del.title'), {
          confirmButtonText: this.$i18n.t('iot.product.del.yes'),
          cancelButtonText: this.$i18n.t('iot.product.del.cancel'),
          type: 'warning'
        }).then(function () {
          return delProduct(row.id)
        }).then(data => {
          this.getList(this.page)
          this.$message.success(this.$i18n.t('iot.product.del.success'))
        }).catch(() =>{
        })
      },

      /**
       * 树
       */

      //查询树结构
      getTree() {
        getTree().then(response=>{
          this.treeData = response.data.data; //获取树结构数据
        })
      },
      //树节点触发事件
      getRelation(data){
        this.text = data.id;//将树节点id作为查询列表条件
        this.getList(this.text);
      },

      /**
       * 按钮
       */

      //搜索按钮
      searchChange(params, done) {
        done();
        this.text = this.search.text;//将搜索框文本内容作为查询列表条件
        this.getList(this.page);
      },
      //清空按钮
      searchReset(){
        this.search.text = "";
        this.text = "";
        this.categoryId = 0;
        this.saveCategoryId = 0;
        this.getList(this.page);
        this.$message.success('已清空选中的产品分类和搜索关键词');
      },

      /**
       * 分页
       */

      currentChange(current) {
        this.page.currentPage = current
      },
      sizeChange(){
      },

      /**
       * 刷新事件
       */

      refreshChange() {
        this.getList(this.page)
      },

      /**
       * 图标
       */

      //图片文件上传后的回调
      uploadAfter(res, done) {
        //获取图片相对路径+名字
        this.myfile = res.myfile;
        done();
        this.$message.success(this.$i18n.t('iot.product.add.success'));
      },
      //删除图片
      uploadDelete(file, column) {
        return new Promise((resolve, reject) => {
          this.$confirm(this.$i18n.t('iot.product.del.warning'), this.$i18n.t('iot.product.del.warning'), {
            confirmButtonText: this.$i18n.t('iot.product.del.yes'),
            cancelButtonText: this.$i18n.t('iot.product.del.cancel'),
            type: "warning",
          }).then(() => {
            uploadDelete(file);
            // 重点来了   这里操作完以后  一定一定要resolve出去，因为这样avue会将原来的数据给清除  如果不resolve，那么再添加图片的话  他会把得到的路径与之前的拼接成一个字符串用“，”分割
            resolve();
            this.$notify.success(this.$i18n.t('iot.product.del.success'))
          }).catch(() => {
            this.$notify.error(this.$i18n.t('iot.product.del.error'));
            // 这里也一定一定要reject，虽然不搞 看似好像没问题  保险起见还是给写上，毕竟我不想再爬坑了 哈哈哈
            reject();
            this.$message({
              type: 'info',
              message: this.$i18n.t('iot.product.del.cancelMessage')
            })
          })
        })
      },

      /**
       * Excel导入
       */

      //批量导入入口
      handleImport() {
        this.upload.title = "导入";
        this.upload.open = true;
      },
      //Excel文件上传中处理
      handleFileUploadProgress() {
        this.upload.isUploading = true;
      },
      //Excel文件上传成功处理
      handleFileSuccess() {
        this.upload.open = false;
        this.upload.isUploading = false;
        this.$refs.upload.clearFiles();
        this.$message.success("导入成功");
        this.getList(this.page);
      },
      // 提交上传Excel文件
      submitFileForm() {
        let that = this;
        that.upload.headers = craeteCommonHeaders();
        setTimeout(()=>{
          that.$refs.upload.submit();
        },50)


      },

      /**
       * 功能
       */

      // 功能按钮点击事件
      pointBtn(row){
        this.dialogVisibleOne = true;
        //获取产品信息
        this.pIdNum = row.productId;
        this.pNameCnText = row.nameCn;
        this.getPointList(this.page)
      },

      //查询功能点
      getPointList(page, params){
        this.pointTableLoading = true;
        //查询产品功能点
        getProductRelation(this.pIdNum, Object.assign({
          current: this.page.currentPage,
          size: this.page.pageSize
        }, params)).then(response => {
          this.pointTableData = response.data.data.records;
          this.page.total = response.data.data.total;
          this.pointTableLoading = false;
        });
      },

      //删除功能点
      pointDel: function (row, index) {
        this.$confirm('确定要删除' + row.nameCn + '功能点？', '提示', {
          confirmButtonText: this.$i18n.t('iot.product.del.yes'),
          cancelButtonText: this.$i18n.t('iot.product.del.cancel'),
          type: 'warning'
        }).then(function () {
          return delProductRelation(row.id);
        }).then(data => {
          this.getPointList(this.page)
          this.$message.success(this.$i18n.t('iot.product.del.success'))
        }).catch(() =>{
        })
      },

      //功能选择按钮点击事件
      pointBtnChoice(){
        this.dialogVisibleTwo = true;
        getDpFlags(this.dpFlag, "").then(response => {
              this.dpFlags = response.data;
            });
      },

      //根据条件查询标识符
      getDpFlagsByText(){
        getDpFlags(this.dpFlag, "").then(response => {
          this.dpFlags = response.data;
        })
      },

      //勾选复选框控制下拉框显隐
      change(){
        if(this.isHide === false){
          this.isHide = true;
        }else{
          this.isHide = false;
        }
      },

      //添加功能点
      addFlags(){
        addProductRelation(this.checkedCities, this.pIdNum);

        console.log(this.checkedCities);
        console.log(this.pIdNum);
      },



    }
  }
</script>
