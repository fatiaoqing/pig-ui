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
            >
              <!--自定义搜索框组件-->
              <template slot-scope="{row,index,type}" slot="keywordSearch">
                <el-input v-model="search.text" clearable v-bind:placeholder="请输入内容" style="width: 125%">
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
              <template slot="menu" slot-scope="scope">
                <el-button type="text" size="small" @click="pointBtn">功能</el-button>
              </template>
            </avue-crud>
            <!--功能表-->
            <el-dialog title="" :visible.sync="dialogVisibleOne" width="80%">
              <avue-crud
                ref="pointCrud"
                :data="pointTableData"
                :option="pointTableOption"
              >
                <!--功能表自定义input框-->
                <template slot-scope="{row,index,type}" slot="menuLeft">
                  <span>产品ID</span>
                  <el-input v-bind:placeholder=pIdNum style="width: 30%">
                  </el-input>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;产品名称中文</span>
                  <el-input v-bind:placeholder=pNameCnText style="width: 20%">
                  </el-input>
                  <div>&nbsp;</div>
                    <el-button type="primary" size="small" @click="pointBtnChoice">功能选择</el-button>
                </template>
              </avue-crud>
              <!--功能选择表格(标识符)-->
              <el-dialog title="" :visible.sync="dialogVisibleTwo" width="90%" :modal="false">
                <el-header>
                  <!--功能选择自定义input框-->
                  <template>
                    <el-input  style="width: 15%">
                    </el-input>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-button type="primary" size="small" @click="" icon="el-icon-search">查询</el-button>
                  </template>
                </el-header>
                <el-main>
<!--                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
                  <el-checkbox-group v-model="checked">
                    <el-row :gutter="20">
                      <el-col :span="6" v-for="(item, index) in flags" :key="index">
                        <div class="grid-content bg-purple">
                          <el-checkbox :label="item">{{item}}
                            <el-select v-model="item.selectOptions" placeholder="请选择">
                              <el-option
                                v-for="item in item.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </el-checkbox>
                        </div>
                      </el-col>
                    </el-row>
                  </el-checkbox-group>
                </el-main>
                <el-footer>
                  <div style="width: 100%;text-align: center">
                    <el-button type="primary" size="small" @click="">提交</el-button>
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
                drag
              >
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
    getFlags,
  } from '@/api/admin/product'
  import {tableOption} from '@/const/crud/admin/product'
  import {pointTableOption} from '@/const/crud/admin/product'
  import {pointChoiceOption} from '@/const/crud/admin/product'
  import {mapGetters} from 'vuex'
  import store from "@/store";
  import Avue from '@smallwei/avue';
  import '@smallwei/avue/lib/index.css';

  export default {
    data() {
      return {

        dialogVisibleOne: false,//控制功能表显隐的变量
        pointTableData: [],//功能表数据
        pointTableOption: pointTableOption,//功能表格
        pIdNum: "",
        pNameCnText: "",
        dialogVisibleTwo: false,//控制功能选择弹窗显隐的变量
        checked: [],//复选框组数据
        flags: [],
        data:[
          {
            name: '1',
            selectOptions: '',
            options: [
              {
                value: '1',
                label: '上报'
              },
              {
                value: '2',
                label: '下发'
              },
              {
                value: '3',
                label: '可上报可下发'
              }
            ]
          },
        ],



        upload: {
          open: false,
          title: "",
          isUploading: false,
          headers: { Authorization: "Bearer " + store.getters.access_token },
          url: "/admin/products/excel"
        },
        treeData: [],   //左测树结构数据
        defaultProps: {
          children: 'children',
          label: 'nameCn'
        },
        listQuery: {
          nameCn: undefined
        },
        excelBtn: true, //导出按钮
        addBtn: false,  //新增按钮
        menu: false,
        align: 'center',
        search: {},     //搜索框文本
        tableData: [],  //右侧列表数据
        page: {
          total: 0,     //总页数
          currentPage: 1,// 当前页数
          pageSize: 20  //展示数据个数
        },
        categoryId: 0, //查询列表数据的条件参数（产品分类id）
        saveCategoryId: 0,  //存储categoryId
        text: '',       //查询列表数据的条件参数(关键字)
        tableLoading: false,
        tableOption: tableOption
      }
    },
    created(){    //生命周期-创建
      this.getTree();//初始化树结构
    },
    computed: {
      ...mapGetters(["permissions"]),
    },
    methods: {    //生命周期-渲染

      // 功能按钮点击事件
      pointBtn(){
        this.title = "功能表";
        this.dialogVisibleOne = true;
      },

      // 功能选择按钮点击事件
      pointBtnChoice(){
        this.dialogVisibleTwo = true;
        getFlags().then(response => {
          // this.data = response.data
          this.flags = response.data;
          console.log(this.flags);
        })
      },



      //查询产品列表
      getList(page, params) {
        this.tableLoading = true
        getProduct(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params), this.categoryId , this.text).then(response => {
          this.tableData = response.data.data.records
          this.page.total = response.data.data.total
          this.tableLoading = false
        })
      },
      //新增产品
      rowSave(row, done, tableLoading) {
        this.tableLoading = true;
        addProduct(Object.assign({}, row)).then(() => {
          this.$message.success('成功')
          done();
          this.getList(this.page);
        }).catch(() => {
          this.$message.error('失败')
        })
      },
      //更新产品
      rowUpdate(row, index, done, tableLoading) {
        this.tableLoading = true
        putProduct(row).then(() => {
          this.$message.success('成功')
          done()
          this.getList(this.page);
        }).catch(() => {
          this.$message.error('失败')
        })
      },
      //删除产品
      rowDel: function (row, index) {
        this.$confirm('确定删除' + row.productId + '吗？', 'title', {
          confirmButtonText: 'YES',
          cancelButtonText: 'NO',
          type: 'warning'
        }).then(function () {
          return delProduct(row.id)
        }).then(data => {
          this.getList(this.page)
          this.$message.success('OK')
        }).catch(() =>{
          this.$message.error('NOT OK')
        })
      },
      //查询树结构
      getTree() {
        getTree(this.listQuery).then(response=>{
          this.treeData = response.data.data; //获取树结构数据
        })
      },
      //树节点触发事件
      getRelation(data){
        this.saveCategoryId = data.id;
        this.categoryId = data.id;//将树节点id作为查询列表条件
        this.getList(this.categoryId);
      },
      //搜索按钮点击事件
      searchChange(params, done) {
        done();
        this.categoryId = this.saveCategoryId;//获取当前选择树节点id作为查询列表条件
        this.text = this.search.text;//获取搜索框文本内容作为查询列表条件
        this.getList(this.page);
      },
      //清空按钮点击事件
      searchReset(){
        this.search.text = "";
        this.text = "";
        this.categoryId = 0;
        this.saveCategoryId = 0;
        this.getList(this.page);
        this.$message.success('已清空选中的产品分类和搜索关键词');
      },
      currentChange(current) {
        this.page.currentPage = current
      },
      sizeChange(){
      },
      //刷新事件
      refreshChange() {
        this.getList(this.page)
      },
      //批量导入
      handleImport() {
        this.upload.title = "导入";
        this.upload.open = true;
      },
      // 文件上传中处理
      handleFileUploadProgress() {
        this.upload.isUploading = true;
      },
      // 文件上传成功处理
      handleFileSuccess() {
        this.upload.open = false;
        this.upload.isUploading = false;
        this.$refs.upload.clearFiles();
        this.$message.success("导入成功");
        this.getList(this.page);
      },
      // 提交上传文件
      submitFileForm() {
        this.$refs.upload.submit();
      },
    }
  }
</script>
