<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column type="index" :label="$t('msg.role.index')" width="120">
        </el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="title">
        </el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe">
        </el-table-column>
        <!-- #default="{row}"绑定行数据的解析 -->
        <el-table-column
          :label="$t('msg.role.action')"
          width="200"
          #default="{ row }"
        >
          <el-button
            type="primary"
            size="mini"
            @click="onDistributePermissionClick(row)"
          >
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <DistributePermission
      v-model="visible"
      :roleId="selectRoleId"
    ></DistributePermission>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import DistributePermission from './components/DistributePermission'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()
watchSwitchLang(getRoleList)

const visible = ref(false)
const selectRoleId = ref('')
const onDistributePermissionClick = (row) => {
  visible.value = true
  selectRoleId.value = row.id
}
</script>

<style lang="scss" scoped></style>
