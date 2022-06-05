<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLable">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :key="index"
            :label="item.label"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
      <div></div>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="tableData" border style="width: 100%">
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          ><template v-if="item.prop === 'publicDate'" #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
          <template v-else-if="item.prop === 'action'" #default="{ row }">
            <el-button type="primary" size="mini" @click="onShowClick(row)">
              {{ $t('msg.article.show') }}
            </el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">
              {{ $t('msg.article.remove') }}
            </el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="ranking" :label="$t('msg.article.ranking')">
        </el-table-column>
        <el-table-column prop="title" :label="$t('msg.article.title')">
        </el-table-column>
        <el-table-column prop="author" :label="$t('msg.article.author')">
        </el-table-column>
        <el-table-column :label="$t('msg.article.publicDate')">
          <template #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="desc" :label="$t('msg.article.desc')">
        </el-table-column>
        <el-table-column :label="$t('msg.article.action')">
          <template #default="{ row }">
            <el-button type="primary" size="mini" @click="onShowClick(row)">{{
              $t('msg.article.show')
            }}</el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
              $t('msg.article.remove')
            }}</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="size"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted } from 'vue'
import { getArticleList, deleteArticle } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { dynamicData, selectDynamicLable, tableColumns } from './dynamic/index'
import { tableRef, initSortable } from './sortable'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

// 数据相关
const tableData = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)

const getListData = async () => {
  const result = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()
watchSwitchLang(getListData)
// 页面缓存处理
onActivated(getListData)

// 在onMounted生命周期初始化sortable
// 在onMounted生命周期传入，value在初始化才有值，只能传入ref
// 传入getListData，重新刷新页面显示的排序
onMounted(() => {
  initSortable(tableData, getListData)
})

// 点击查看
const router = useRouter()
const onShowClick = (row) => {
  router.push(`/article/${row._id}`)
}
// 点击删除
const i18n = useI18n()
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteArticle(row._id)
    ElMessage.success(i18n.t('msg.article.removeSuccess'))
    getListData()
  })
}

// size改变
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}
// page改变
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
::v-deep .sortable-ghost {
  opacity: 0.6;
  color: #fff;
  background: #304156;
}
</style>
