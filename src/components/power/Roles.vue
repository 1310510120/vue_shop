<<template>
<div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>
        <el-row>
            <el-col>
                <el-button type="primary">添加角色</el-button>
            </el-col>
        </el-row>

        <!-- 角色列表 -->
        <el-table :data="roleList" border stripe>
            <!-- 展开列 -->
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <div>
                    <el-row :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
                        <!-- 渲染一级权限 -->
                        <el-col :span="5">
                            <el-tag>{{item1.authName}}</el-tag>
                            <i class="el-icon-caret-right"></i>
                        </el-col>
                        <!-- 渲染二级和三级权限 -->
                        <el-col :span="19">
                            <el-row :class="[i2 === 0 ? '' : 'bdtop','vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                                <el-col :span="6">
                                    <el-tag type="success">{{item2.authName}}</el-tag>
                                    <i class="el-icon-caret-right"></i>
                                </el-col>
                                <el-col :span="18">
                                    <el-tag type="warning" v-for="(item3, i3) in item2.children" :key="item3.id"
                                    closable @close="removeRightById">
                                    {{item3.authName}}
                                    </el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    
                    <pre>
                       
                    </pre>
                    </div>
                </template>
            </el-table-column>
            
            <el-table-column type="index"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div>
                    <el-button type="primary" icon="el-icon-search">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete">删除</el-button>
                    <el-button type="warning" icon="el-icon-setting">分配权限</el-button>
                   </div>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</div>
</template>

<script>
export default {
    data(){
        return {
            roleList: []
        }
    },
    created() {
        this.getRolesList()
    },
    methods: {
        async getRolesList() {
            const {data: res} = await this.$http.get('roles')
            if(res.meta.status !== 200) {
                return this.$message.error('获取角色列表失败!')
            }
            this.roleList = res.data
            console.log(this.roleList)
        },
        //根据id删除对应的权限
        async removeRightById(){
            //提示用户是否进行删除
            const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err => err)

            if(confirmResult !== 'confirm'){
                return this.$message.info('取消了删除')
            }
            console.log('确认了删除')
        }
    }
}
</script>

<style lang="less" scoped>

.el-tag{
    margin: 7px;
}

.bdtop{
    border-top: 1px solid #eee;
}

.bdbottom{
    border-bottom: 1px solid #eee;
}

.vcenter {
    display: flex;
    align-items: center;
}


</style>