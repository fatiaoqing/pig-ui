<template>
  <div>
    <basic-container>
      <el-container style="height: 630px">

        <el-aside width="22%">
          <el-button style="width: 100px"
                     type="primary"
                     @click="dialogVisible = true"
                     icon="el-icon-circle-plus-outline">
            {{ editCategory }}
          </el-button>
          <el-button
            type="primary"
            @click="expandAll">
            {{ expand }}
          </el-button>
          <el-dialog
            :visible.sync="dialogVisible"
            width="63%">
            <el-container style="height: 400px;">
              <el-header height="0%"></el-header>
              <el-main>
                <avue-crud
                  ref="treeform"
                  :data="treeData"
                  :option="treeOption"
                  v-model="treeForm"
                  @refresh-change="handleRefreshChangeTree"
                  @row-update="updateTree"
                  @row-save="saveTree"
                  @row-del="delTree"
                  :upload-after="uploadAfter"
                  :upload-delete="uploadDelete"
                  :before-open="beforeOpenTree"
                  :permission="getPermission">
                </avue-crud>
              </el-main>
              <el-footer height="0%"></el-footer>
            </el-container>

          </el-dialog>
          <el-tree
            :data="treeData"
            node-key="id"
            ref="tree"
            :defaultExpandAll="true"
            :highlight-current="true"
            :props="defaultProps"
            @node-click="getNodeList">
          </el-tree>
        </el-aside>
        <el-main style="height: 600px">
          <avue-crud
            ref="table"
            :data="categoriesData"
            :option="option"
            v-model="form"
            :page.sync="page"
            :search.sync="search"
            :table-loading="listLoading"
            @refresh-change="handleRefreshChange"
            @size-change="sizeChange"
            @current-change="currentChange"
            @search-change="handleFilter"
            @row-update="update"
            @row-save="save"
            @row-del="del"
            :upload-after="uploadAfter"
            :upload-delete="uploadDelete"
            :before-open="beforeOpen">
            <template slot="nameSearch">
              <el-input placeholder="search" style="width:300px;"
                        v-model="search.name"></el-input>
            </template>
          </avue-crud>
        </el-main>
      </el-container>

    </basic-container>
  </div>
</template>
<script>
import {
  getCategoryTree, addCategory, updateCategory, delCategory, getCategories, uploadDelete,
  getHome
} from "@/api/admin/products/categories";
import {tableOption, treeOption} from "@/const/crud/admin/products/categories";
import {mapGetters} from "vuex";

export default {
  name: "categories",
  data() {
    return {
      //编辑分类按钮名称
      editCategory: this.$i18n.t('iot.categories.editCategory'),
      //展开按钮名称
      expand: this.$i18n.t('iot.categories.noExpand'),
      //是否显示dialog
      dialogVisible: false,
      //产品分类树数据对象数组
      treeData: [],
      //表格配置属性
      treeOption: treeOption,
      //编辑和新增的表单对象
      treeForm: {},
      //配置选项
      defaultProps: {
        children: 'children',
        label: 'nameCn'
      },
      //产品分类树分页对象
      treePage: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条,
      },
      //上传文件地址
      myfile: '',

      //产品分类数据
      categoriesData: [],
      //表格配置属性
      option: tableOption,
      //编辑和新增的表单对象
      form: {},
      //分页对象
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条,
        isAsc: false, //是否倒序
      },
      //表格搜索的表单变量
      search: {},
      //表格等待框的控制
      listLoading: false,
      //当前搜索数据
      currentSearch: {},
      //当前所在的分类树数据
      currentTreeData: {},

    }
  },
  computed: {
    ...mapGetters(['permissions']),
  },

  created() {
    this.getList();
    getHome().then(response=>{
      tableOption.column[5].propsHttp.home = response.data;
      treeOption.column[5].propsHttp.home = response.data;
    })
  },

  methods: {
    /**
     * 获得产品分类树
     */
    getList() {
      getCategoryTree().then(response => {
        this.treeData = response.data.data;
      })
    },
    /**
     * 按钮控制
     */
    getPermission(key, row, index) {
      if (index == 0) {
        return false;
      }
      return true;
    },

    beforeOpenTree(done, type) {
      done();
      if(type == 'add'){
        this.treeForm.parentId = this.currentTreeData.id;
      }
    },
    /**
     * 手动刷新
     */
    handleRefreshChangeTree() {
      this.getList();
    },
    //展开和收起
    expandAll() {
      if (this.expand == this.$i18n.t('iot.categories.expand')) {
        this.$refs.tree.store.defaultExpandAll = true;
        this.expand = this.$i18n.t('iot.categories.noExpand');
      } else if (this.expand == this.$i18n.t('iot.categories.noExpand')) {
        this.$refs.tree.store.defaultExpandAll = false;
        this.expand = this.$i18n.t('iot.categories.expand');
      }
      this.handleRefreshChangeTree();
    },
    /**
     * 更新产品分类树
     */
    updateTree(row, index, done, loading) {
      if (this.myfile != '') {
        row.iconUrl = this.myfile;
        this.myfile = '';
      }
      updateCategory(row).then(() => {
        this.handleRefreshChangeTree();
        done();
        this.$notify.success(this.$i18n.t('iot.categories.update.success'))
      }).catch(() => {
        this.$notify.success(this.$i18n.t('iot.categories.update.error'))
      });
    },
    /**
     * 保存产品分类树
     * @param row
     * @param done
     * @param loading
     */
    saveTree(row, done, loading) {
      row.iconUrl = this.myfile;
      this.myfile = '';
      addCategory(row).then(() => {
        this.handleRefreshChangeTree();
        done();
        this.$notify.success(this.$i18n.t('iot.categories.add.success'))
      }).catch(() => {
        this.$notify.success(this.$i18n.t('iot.categories.add.error'))
      });
    },
    /**
     * 删除单个产品分类树数据
     * @param row
     */
    delTree(row) {
      this.$confirm(this.$i18n.t('iot.categories.del.warning'), this.$i18n.t('iot.categories.del.warning'), {
        confirmButtonText: this.$i18n.t('iot.categories.del.yes'),
        cancelButtonText: this.$i18n.t('iot.categories.del.cancel'),
        type: "warning",
      }).then(() => {
        delCategory(row.id)
          .then(() => {
            this.handleRefreshChangeTree();
            this.$notify.success(this.$i18n.t('iot.categories.del.success'));
          })
          .catch(() => {
            this.$notify.error(this.$i18n.t('iot.categories.del.error'));
          });
      });
    },

    /**
     * 文件上传后的回调
     */
    uploadAfter(res, done) {
      this.myfile = res.myfile;
      done();
      this.$message.success(res);
    },

    uploadDelete(file, column) {
      //column  列配置
      console.log(column)
      // 这里一定要返回Promise   不返回页面报错   官方说的返回true和false好像没用
      return new Promise((resolve, reject) => {
        this.$confirm(this.$i18n.t('iot.categories.del.warning'), this.$i18n.t('iot.categories.del.warning'), {
          confirmButtonText: this.$i18n.t('iot.categories.del.yes'),
          cancelButtonText: this.$i18n.t('iot.categories.del.cancel'),
          type: "warning",
        }).then(() => {
          uploadDelete(file);
          // 重点来了   这里操作完以后  一定一定要resolve出去，因为这样avue会将原来的数据给清除  如果不resolve，那么再添加图片的话  他会把得到的路径与之前的拼接成一个字符串用“，”分割
          resolve();
          this.$notify.success(this.$i18n.t('iot.categories.del.success'))
        }).catch(() => {
          this.$notify.error(this.$i18n.t('iot.categories.del.error'));
          // 这里也一定一定要reject，虽然不搞 看似好像没问题  保险起见还是给写上，毕竟我不想再爬坑了 哈哈哈
          reject();
          this.$message({
            type: 'info',
            message: this.$i18n.t('iot.categories.del.cancelMessage')
          })
        })
      })
    },
    /**
     *  获得分类子树节点
     */
    getNodeList(data, page) {
        this.listLoading = true;
        getCategories(
          Object.assign(
            {
              current: page.currentPage,
              size: page.pageSize,
            }),
          data.id,
          data.name
        ).then(response => {
          if (response.data.data.records == null) {
            this.categoriesData = [];
          } else {
            this.categoriesData = response.data.data.records;
          }
          this.page.total = response.data.data.total;
          this.currentTreeData = data;
          this.listLoading = false;
        })

    },

    /**
     *  获得分类数据节点
     *  @use 查询
     */
    getSearchList(search, page) {
      if (JSON.stringify(this.currentTreeData) == "{}" || this.currentTreeData == 'undefined') {
        search.id = 0;
      } else {
        search.id = this.currentTreeData.id;
      }
      this.listLoading = false;
      getCategories(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
          }),
        search.id,
        search.name
      ).then(response => {
        if (response.data.data.records == null) {
          this.categoriesData = []
        } else {
          this.categoriesData = response.data.data.records;
        }
        this.page.total = response.data.data.total;
        this.listLoading = false;
      })

    },
    beforeOpen(done, type) {
      done();
      if(type == 'add') {
        this.form.parentId = this.currentTreeData.id;
      }
    },
    /**
     * 手动刷新
     */
    handleRefreshChange() {
      if (this.search.name != "") {
        this.getSearchList(this.search, this.page)
      } else if (JSON.stringify(this.currentTreeData) != '{}') {
        this.getNodeList(this.currentTreeData, this.page)
      }
      this.handleRefreshChangeTree();
      //有待改进
    },
    /**
     * pagesize改变触发
     * @param pageSize
     */
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.handleRefreshChange();
    },
    /**
     * 分页页码改变触发
     * @param current
     */
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.handleRefreshChange();
    },

    /**
     * 点击搜索触发
     * @param form
     * @param done
     */
    handleFilter(form, done) {
      if (JSON.stringify(form) != '{}') {
        this.page.currentPage = 1;
        this.getSearchList(this.search, this.page);
      }
      done();
    },
    /**
     * 更新
     * @param row
     * @param index
     * @param done
     * @param loading
     */
    update(row, index, done, loading) {
      if (this.myfile != '') {
        row.iconUrl = this.myfile;
        this.myfile = '';
      }
      updateCategory(row).then(() => {
        this.handleRefreshChange();
        this.$notify.success(this.$i18n.t('iot.categories.update.success'));
      }).catch(() => {
        this.$notify.success(this.$i18n.t('iot.categories.update.error'));
      });
      done();
    },
    /**
     * 保存
     * @param row
     * @param done
     * @param loading
     */
    save(row, done, loading) {
      row.iconUrl = this.myfile;
      this.myfile = '';
      addCategory(row).then(() => {
        done();
        this.handleRefreshChange();
        this.$notify.success(this.$i18n.t('iot.categories.add.success'))
      }).catch(() => {
        this.$notify.success(this.$i18n.t('iot.categories.add.error'))
      });
    },
    /**
     * 删除
     * @param row
     * @param index
     */
    del(row, index) {
      this.$confirm(this.$i18n.t('iot.categories.del.warning'), this.$i18n.t('iot.categories.del.warning'), {
        confirmButtonText: this.$i18n.t('iot.categories.del.yes'),
        cancelButtonText: this.$i18n.t('iot.categories.del.cancel'),
        type: "warning",
      }).then(() => {
        delCategory(row.id)
          .then(() => {
            this.handleRefreshChange();
            this.$notify.success(this.$i18n.t('iot.categories.del.success'));
          })
          .catch(() => {
            this.$notify.error(this.$i18n.t('iot.categories.del.error'));
          });
      });
    },

  }
}
</script>

<style scoped>

</style>
